import { Component } from '@angular/core';
import { UserService} from '../core/services/user.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    isAdmin: false,
  };

  errorMessage: string = '';
  successMessage: string = '';
  isAdmin: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  addUser(): void {
    if (!this.isAdmin) {
      this.errorMessage = 'You do not have permission to add users.';
      return;
    }

    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        this.successMessage = 'User added successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      (error) => {
        this.errorMessage = 'Failed to add user. Username may already exist.';
        this.successMessage = '';
      }
    );
  }

  private resetForm(): void {
    this.newUser = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      isAdmin: false,
    };
  }
}
