import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIResponse {
  response: string;
  timestamp: string;
  provider: string;
  model?: string;
}

export interface AIRequest {
  message: string;
  context?: string;
}

export abstract class AIProvider {
  abstract generateResponse(request: AIRequest): Promise<string>;
  abstract isConfigured(): boolean;
  abstract getProviderName(): string;
}

class OpenAIProvider extends AIProvider {
  private client: OpenAI | null = null;

  constructor() {
    super();
    if (process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  isConfigured(): boolean {
    return !!this.client;
  }

  getProviderName(): string {
    return 'OpenAI';
  }

  async generateResponse(request: AIRequest): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI API key not configured');
    }

    const completion = await this.client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-5',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant.${request.context ? ` Context: ${request.context}` : ''}`,
        },
        {
          role: 'user',
          content: request.message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  }
}

class AnthropicProvider extends AIProvider {
  private client: Anthropic | null = null;

  constructor() {
    super();
    if (process.env.ANTHROPIC_API_KEY) {
      this.client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  isConfigured(): boolean {
    return !!this.client;
  }

  getProviderName(): string {
    return 'Anthropic Claude';
  }

  async generateResponse(request: AIRequest): Promise<string> {
    if (!this.client) {
      throw new Error('Anthropic API key not configured');
    }

    const message = await this.client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-opus-4.1',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `${request.context ? `Context: ${request.context}\n\n` : ''}${request.message}`,
        },
      ],
    });

    return message.content[0]?.type === 'text' ? message.content[0].text : 'Sorry, I could not generate a response.';
  }
}

class GoogleProvider extends AIProvider {
  private client: GoogleGenerativeAI | null = null;

  constructor() {
    super();
    if (process.env.GOOGLE_API_KEY) {
      this.client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    }
  }

  isConfigured(): boolean {
    return !!this.client;
  }

  getProviderName(): string {
    return 'Google Gemini';
  }

  async generateResponse(request: AIRequest): Promise<string> {
    if (!this.client) {
      throw new Error('Google API key not configured');
    }

    const model = this.client.getGenerativeModel({ model: process.env.GOOGLE_MODEL || 'gemini-2.5-pro' });
    
    const prompt = `${request.context ? `Context: ${request.context}\n\n` : ''}${request.message}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text() || 'Sorry, I could not generate a response.';
  }
}

class AzureOpenAIProvider extends AIProvider {
  private client: OpenAI | null = null;

  constructor() {
    super();
    if (process.env.AZURE_OPENAI_API_KEY && process.env.AZURE_OPENAI_ENDPOINT) {
      this.client = new OpenAI({
        apiKey: process.env.AZURE_OPENAI_API_KEY,
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/gpt-4`,
        defaultQuery: { 'api-version': '2024-02-15-preview' },
        defaultHeaders: {
          'api-key': process.env.AZURE_OPENAI_API_KEY,
        },
      });
    }
  }

  isConfigured(): boolean {
    return !!this.client;
  }

  getProviderName(): string {
    return 'Azure OpenAI';
  }

  async generateResponse(request: AIRequest): Promise<string> {
    if (!this.client) {
      throw new Error('Azure OpenAI API key not configured');
    }

    const completion = await this.client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL || 'gpt-5', // Azure deployment name
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant.${request.context ? ` Context: ${request.context}` : ''}`,
        },
        {
          role: 'user',
          content: request.message,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  }
}

export class AIProviderManager {
  private providers: Map<string, AIProvider> = new Map();

  constructor() {
    this.providers.set('openai', new OpenAIProvider());
    this.providers.set('anthropic', new AnthropicProvider());
    this.providers.set('google', new GoogleProvider());
    this.providers.set('azure-openai', new AzureOpenAIProvider());
  }

  getProvider(providerName?: string): AIProvider {
    const selectedProvider = providerName || process.env.AI_PROVIDER || 'openai';
    
    const provider = this.providers.get(selectedProvider.toLowerCase());
    if (!provider) {
      throw new Error(`Unsupported AI provider: ${selectedProvider}`);
    }

    if (!provider.isConfigured()) {
      throw new Error(`${provider.getProviderName()} API key not configured. Please set the appropriate environment variable.`);
    }

    return provider;
  }

  getAvailableProviders(): { name: string; configured: boolean }[] {
    return Array.from(this.providers.entries()).map(([key, provider]) => ({
      name: key,
      configured: provider.isConfigured(),
    }));
  }

  async generateResponse(request: AIRequest, providerName?: string): Promise<AIResponse> {
    const provider = this.getProvider(providerName);
    const response = await provider.generateResponse(request);

    return {
      response,
      timestamp: new Date().toISOString(),
      provider: provider.getProviderName(),
    };
  }
}