import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private backendUrl = environment.backendUrl;
  user: any = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
  }

  checkAuth() {
    return this.http.get<{ success: boolean, user?: any }>(`${this.backendUrl}/auth/profile`, { withCredentials: true });
  }

  setUser(user: any) {
    this.user = user;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  clearUser() {
    this.user = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
}