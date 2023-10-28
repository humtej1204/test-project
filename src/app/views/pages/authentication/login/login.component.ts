import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Auth } from 'src/app/models/Auth.model';
import { User, UserLogin } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = false

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]]
    });
  }

  validateForm(): boolean {
    return this.loginForm.valid;
  }

  dataToSend(): UserLogin {
    const dataToSend: UserLogin = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    return dataToSend;
  }

  loginUser() {
    if (!this.validateForm()) return;
    
    this.authService.login(this.dataToSend())
    .pipe(
      switchMap((res: Auth) => this.authService.getProfile())
    )
    .subscribe({
      next: (res: User) => {
        this.router.navigateByUrl('dashboard');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }
}
