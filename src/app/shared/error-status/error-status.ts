import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-status',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './error-status.html',
  styleUrl: './error-status.scss',
})
export class ErrorStatus implements OnChanges {
  @Input() errorMessage = '';
  @Input() errorCode = -2;

  protected friendlyError = '';
  protected friendlyImage = '';
  protected suggestLogin = false;

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.errorCode === 401) {
      this.friendlyError =
        "Oops ! Looks like you're not allowed to get the requested ressource !";
      this.friendlyImage = 'not-found.png';
      this.suggestLogin = true;
    } else if (this.errorCode === 404) {
      this.friendlyError =
        "Oops ! Looks like the ressource you requested doesn't exist !";
      this.friendlyImage = 'generic-4xx.png';
    } else if (this.errorCode >= 400 && this.errorCode <= 499) {
      this.friendlyError =
        'Oops ! Looks like something is not ok with your request !';
      this.friendlyImage = 'generic-4xx.png';
    } else {
      this.friendlyError =
        'Oops ! An unexpected error happened with the backend !';
      this.friendlyImage = 'generic-5xx.png';
    }
  }
}
