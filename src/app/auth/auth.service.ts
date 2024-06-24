import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  private readonly USERNAME_KEY = 'loggedInUserName';
  private isLoggedIn = false;
  private loggedInUserName: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isLoggedIn = this.checkAuthentication();
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInUserName = localStorage.getItem(this.USERNAME_KEY);
    }
  }

  private checkAuthentication(): boolean {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem(this.AUTH_KEY) === 'true') {
      return true;
    }
    return false;
  }

  login(username: string, password: string, name: string): boolean {
    if (username && password) {
      this.isLoggedIn = true;
      this.loggedInUserName = name;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.AUTH_KEY, 'true');
        localStorage.setItem(this.USERNAME_KEY, name);
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUserName = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_KEY);
      localStorage.removeItem(this.USERNAME_KEY);
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserName;
  }
}