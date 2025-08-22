import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../services/http-service';
import { FormsModule } from '@angular/forms';
import { Credentials } from '../../dto/credentials';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private httpService = inject(HttpService);
  private router = inject(Router);

  protected username = '';
  protected password = '';

  protected httpErrorMessage = signal('');

  protected login() {
    this.httpErrorMessage.set('');

    const credentials: Credentials = {
      username: this.username,
      password: this.password,
    };

    this.httpService
      .login(credentials)
      .pipe(
        catchError((err) => {
          const errCode = +err.status;

          if (errCode === 401) {
            this.httpErrorMessage.set('Username or password incorect.');
          } else {
            this.httpErrorMessage.set(
              'An error occured during login, try again.',
            );
          }

          return EMPTY;
        }),
      )
      .subscribe((_res) => {
        this.router.navigate(['/vulnerability-reports-overview']);
      });
  }
}
