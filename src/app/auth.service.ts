import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router,) { }
  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}