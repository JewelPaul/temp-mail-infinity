const API_BASE = 'https://api.mail.gw';
const USE_MOCK = true; // Set to false to use real API when available

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

// Mock data for demo purposes
const MOCK_DOMAINS: Domain[] = [
  { id: '1', domain: 'bravo-mail.com', isActive: true },
  { id: '2', domain: 'temp-email.net', isActive: true }
];

const MOCK_MESSAGES: EmailMessage[] = [
  {
    id: '1',
    from: { name: 'GitHub', address: 'noreply@github.com' },
    subject: 'Welcome to GitHub!',
    intro: 'Thanks for signing up! Your account is ready.',
    seen: false,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    size: 1024
  },
  {
    id: '2', 
    from: { name: 'Netflix', address: 'info@netflix.com' },
    subject: 'Verify your email address',
    intro: 'Please click the link below to verify your email.',
    seen: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    size: 2048
  }
];

class MailApi {
  private currentAccount: EmailAccount | null = null;
  private authToken: string | null = null;

  // Mock API methods for demo purposes
  private async mockDelay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async mockGetDomains(): Promise<Domain[]> {
    await this.mockDelay(500);
    return MOCK_DOMAINS;
  }

  private async mockCreateAccount(): Promise<EmailAccount> {
    await this.mockDelay(1000);
    
    const username = Math.random().toString(36).substring(2, 10);
    const domain = MOCK_DOMAINS[0].domain;
    const address = `${username}@${domain}`;
    const password = Math.random().toString(36).substring(2, 15);
    const token = 'mock_token_' + Math.random().toString(36).substring(2, 15);
    
    const account: EmailAccount = {
      id: Math.random().toString(36).substring(2, 15),
      address,
      password,
      token
    };
    
    this.currentAccount = account;
    this.authToken = token;
    
    return account;
  }

  private async mockGetMessages(): Promise<EmailMessage[]> {
    await this.mockDelay(600);
    // Simulate some messages arriving over time
    const numMessages = Math.floor(Math.random() * 3);
    return MOCK_MESSAGES.slice(0, numMessages);
  }

  private async mockGetMessage(id: string): Promise<EmailContent> {
    await this.mockDelay(400);
    const message = MOCK_MESSAGES.find(m => m.id === id);
    if (!message) throw new Error('Message not found');
    
    return {
      ...message,
      html: [`<p>${message.intro}</p><p>This is a demo message in BravoMail.</p>`],
      text: `${message.intro}\n\nThis is a demo message in BravoMail.`
    };
  }

  private async mockDeleteAccount(): Promise<void> {
    await this.mockDelay(300);
    this.currentAccount = null;
    this.authToken = null;
  }

  // Get available domains
  async getDomains(): Promise<Domain[]> {
    if (USE_MOCK) {
      return this.mockGetDomains();
    }

    try {
      const response = await fetch(`${API_BASE}/domains`);
      if (!response.ok) throw new Error('Failed to fetch domains');
      
      const data = await response.json();
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching domains:', error);
      // Fallback to mock if real API fails
      return this.mockGetDomains();
    }
  }

  // Create a new email account
  async createAccount(): Promise<EmailAccount> {
    if (USE_MOCK) {
      return this.mockCreateAccount();
    }

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
      // Fallback to mock if real API fails
      return this.mockCreateAccount();
    }
  }

  // Get messages for current account
  async getMessages(): Promise<EmailMessage[]> {
    if (!this.authToken) throw new Error('No authenticated account');

    if (USE_MOCK) {
      return this.mockGetMessages();
    }

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
      // Fallback to mock if real API fails
      return this.mockGetMessages();
    }
  }

  // Get full message content
  async getMessage(id: string): Promise<EmailContent> {
    if (!this.authToken) throw new Error('No authenticated account');

    if (USE_MOCK) {
      return this.mockGetMessage(id);
    }

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
      // Fallback to mock if real API fails
      return this.mockGetMessage(id);
    }
  }

  // Delete current account
  async deleteAccount(): Promise<void> {
    if (!this.currentAccount || !this.authToken) return;

    if (USE_MOCK) {
      return this.mockDeleteAccount();
    }

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
      // Fallback to mock behavior
      await this.mockDeleteAccount();
    }
  }

  getCurrentAccount(): EmailAccount | null {
    return this.currentAccount;
  }
}

export const mailApi = new MailApi();