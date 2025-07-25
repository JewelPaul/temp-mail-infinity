const API_BASE = 'https://api.mail.gw';

export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
}

export interface EmailAccount {
  id: string;
  address: string;
  password?: string;
  token?: string;
}

export interface EmailMessage {
  id: string;
  from: {
    name: string;
    address: string;
  };
  subject: string;
  intro: string;
  seen: boolean;
  createdAt: string;
  size: number;
}

export interface EmailContent extends EmailMessage {
  html: string[];
  text: string;
}

class MailApi {
  private currentAccount: EmailAccount | null = null;
  private authToken: string | null = null;

  // Get available domains
  async getDomains(): Promise<Domain[]> {
    try {
      const response = await fetch(`${API_BASE}/domains`);
      if (!response.ok) throw new Error('Failed to fetch domains');
      
      const data = await response.json();
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching domains:', error);
      throw error;
    }
  }

  // Create a new email account
  async createAccount(): Promise<EmailAccount> {
    try {
      // Get available domains first
      const domains = await this.getDomains();
      if (domains.length === 0) throw new Error('No domains available');

      // Generate random username
      const username = Math.random().toString(36).substring(2, 10);
      const domain = domains[0].domain;
      const address = `${username}@${domain}`;
      const password = Math.random().toString(36).substring(2, 15);

      // Create account
      const response = await fetch(`${API_BASE}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          password,
        }),
      });

      if (!response.ok) throw new Error('Failed to create account');
      
      const account = await response.json();
      
      // Get authentication token
      const tokenResponse = await fetch(`${API_BASE}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          password,
        }),
      });

      if (!tokenResponse.ok) throw new Error('Failed to get token');
      
      const tokenData = await tokenResponse.json();
      
      this.currentAccount = {
        id: account.id,
        address: account.address,
        password,
        token: tokenData.token,
      };
      
      this.authToken = tokenData.token;
      
      return this.currentAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  // Get messages for current account
  async getMessages(): Promise<EmailMessage[]> {
    if (!this.authToken) throw new Error('No authenticated account');

    try {
      const response = await fetch(`${API_BASE}/messages`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data = await response.json();
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // Get full message content
  async getMessage(id: string): Promise<EmailContent> {
    if (!this.authToken) throw new Error('No authenticated account');

    try {
      const response = await fetch(`${API_BASE}/messages/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch message');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  }

  // Delete current account
  async deleteAccount(): Promise<void> {
    if (!this.currentAccount || !this.authToken) return;

    try {
      await fetch(`${API_BASE}/accounts/${this.currentAccount.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });
      
      this.currentAccount = null;
      this.authToken = null;
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  }

  getCurrentAccount(): EmailAccount | null {
    return this.currentAccount;
  }
}

export const mailApi = new MailApi();