import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  private isLoggedIn = false; 

  constructor() {
   
    this.isLoggedIn = this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
   
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.AUTH_KEY) === 'true';
    }
    return false; 
  }

  login(username: string, password: string): boolean {
   
    if (username && password) {
      this.isLoggedIn = true;
      localStorage.setItem(this.AUTH_KEY, 'true');
      return true;
    }
    return false; 
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.AUTH_KEY);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
