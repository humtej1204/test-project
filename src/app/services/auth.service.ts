import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User, UserLogin } from '../models/User.model';
import { Auth } from '../models/Auth.model';
import { TokenService } from './token/token.service';
import { checkToken } from '../interceptors/token/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.verifyUserLogged();
  }

  private profile = new BehaviorSubject<User | null>(null);
  myProfile$ = this.profile.asObservable();

  verifyUserLogged() {
    const userData = localStorage.getItem('user');
    if (userData) this.profile.next(JSON.parse(userData) as User);
  }

  login(data: UserLogin) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email: data.email, password: data.password})
    .pipe(
      tap(res => this.tokenService.saveToken(res.access_token))
    )
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`, { context: checkToken() })
    .pipe(
      tap((res: User) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.profile.next(res);
      })
    )
  }

  logout() {
    this.tokenService.removeToken();
  }
}
