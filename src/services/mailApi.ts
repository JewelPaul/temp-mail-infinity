const API_BASE = 'https://api.mail.gw';
// Set to true for development/demo when real API is not accessible
// Set to false for production with real email service
const USE_MOCK = true; 

// CORS proxy for development/testing when direct API access is blocked
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const USE_CORS_PROXY = false; // Enable if needed for CORS issues

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

const MOCK_MESSAGES: EmailMessage[] = [];

class MailApi {
  private currentAccount: EmailAccount | null = null;
  private authToken: string | null = null;

  private getApiUrl(endpoint: string): string {
    const baseUrl = USE_CORS_PROXY ? `${CORS_PROXY}${API_BASE}` : API_BASE;
    return `${baseUrl}${endpoint}`;
  }

  // Get current API mode for UI display
  getApiMode(): 'mock' | 'real' {
    return USE_MOCK ? 'mock' : 'real';
  }

  // Check if real API is available
  async checkApiHealth(): Promise<boolean> {
    if (USE_MOCK) return true;
    
    try {
      const response = await fetch(this.getApiUrl('/domains'), { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  }

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
    // Always return empty array - no demo/fake emails
    return [];
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
      const response = await fetch(this.getApiUrl('/domains'));
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching domains:', error);
      throw new Error(`Unable to connect to email service. Please check your internet connection and try again. ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      if (domains.length === 0) {
        throw new Error('No email domains available from the service');
      }

      // Generate random username
      const username = Math.random().toString(36).substring(2, 10);
      const domain = domains[0].domain;
      const address = `${username}@${domain}`;
      const password = Math.random().toString(36).substring(2, 15);

      // Create account
      const response = await fetch(this.getApiUrl('/accounts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create email account: ${response.status} ${response.statusText}`);
      }
      
      const account = await response.json();
      
      // Get authentication token
      const tokenResponse = await fetch(this.getApiUrl('/token'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          password,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Failed to authenticate: ${tokenResponse.status} ${tokenResponse.statusText}`);
      }
      
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
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to create temporary email. The email service may be temporarily unavailable.');
    }
  }

  // Get messages for current account
  async getMessages(): Promise<EmailMessage[]> {
    if (!this.authToken) throw new Error('No authenticated account');

    if (USE_MOCK) {
      return this.mockGetMessages();
    }

    try {
      const response = await fetch(this.getApiUrl('/messages'), {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to fetch emails. The email service may be temporarily unavailable.');
    }
  }

  // Get full message content
  async getMessage(id: string): Promise<EmailContent> {
    if (!this.authToken) throw new Error('No authenticated account');

    if (USE_MOCK) {
      return this.mockGetMessage(id);
    }

    try {
      const response = await fetch(this.getApiUrl(`/messages/${id}`), {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch message: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching message:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to load email content. The email service may be temporarily unavailable.');
    }
  }

  // Delete current account
  async deleteAccount(): Promise<void> {
    if (!this.currentAccount || !this.authToken) return;

    if (USE_MOCK) {
      return this.mockDeleteAccount();
    }

    try {
      await fetch(this.getApiUrl(`/accounts/${this.currentAccount.id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });
      
      this.currentAccount = null;
      this.authToken = null;
    } catch (error) {
      console.error('Error deleting account:', error);
      // Still clear local state even if API call fails
      this.currentAccount = null;
      this.authToken = null;
    }
  }

  getCurrentAccount(): EmailAccount | null {
    return this.currentAccount;
  }
}

export const mailApi = new MailApi();