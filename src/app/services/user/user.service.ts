import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRegister } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'https://young-sands-07814.herokuapp.com/api';

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(dto: UserRegister) {
    return this.http.post<User>(`${this.apiUrl}/users`, dto);
  }
}
