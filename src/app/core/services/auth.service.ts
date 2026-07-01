import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {}

  login(usuario: string, contrasena: string): boolean {
    // Temporal dummy login
    if (usuario === '123' && contrasena === '123') {
      this.isAuthenticated.set(true);
      this.router.navigate(['/admin/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.router.navigate(['/admin/login']);
  }
}
