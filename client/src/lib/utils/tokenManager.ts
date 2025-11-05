class TokenManager {
  private static instance: TokenManager
  private token: string | null = null
  private initialized = false;

  private constructor() {}

  static getInstance () {
    if(!TokenManager.instance) {
      TokenManager.instance = new TokenManager()
    }
    return TokenManager.instance
  }

  private init() {
    if (!this.initialized && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth-token')
      this.initialized = true
    }
  }

  setToken(token: string | null) {
    this.init()
    this.token = token;

    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth-token', token);
      } else {
        localStorage.removeItem('auth-token');
      }
    }
  }

  getToken() {
    this.init()
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clear() {
    this.setToken(null);
  }
}

export const tokenManager = TokenManager.getInstance();