import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  private isLogged = new BehaviorSubject<Boolean>(false);
  isLogged$ = this.isLogged.asObservable();

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');

    this.isLogged.next(true)
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
