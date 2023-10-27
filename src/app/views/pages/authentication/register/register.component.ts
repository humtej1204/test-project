import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserRegister } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide1: boolean = false;
  hide2: boolean = false;

  registerForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]]
    });
  }

  confirmPass: FormControl = new FormControl('', Validators.required);

  getDataToSend(): UserRegister {
    console.log(this.registerForm.value);
    console.log(this.confirmPass.value);
    const dataToSend: UserRegister = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }

    return dataToSend;
  }

  registerUser() {
    this.userService.registerUser(this.getDataToSend())
    .subscribe({
      next: (res: User) => {
        console.log(res)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }
}
