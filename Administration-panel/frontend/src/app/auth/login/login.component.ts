import { Component } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('jwt_token', response.token);
        console.log('Login successful', response);
        console.log('JWT token saved:', response.token);
        this.router.navigate(['/films']);
      },
      (error: any) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
