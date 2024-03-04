import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/core/services/auth.service';
import { NotificationService } from 'app/core/services/notification.service';
import { NotificationType } from '../core/models/notification.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  public loading: boolean = false
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    })
  }

  authenticate() {
    console.log(this.authForm.value);
    if (this.authForm.valid) {
      this.loading = true;
      this.auth.loginUser(this.authForm.value).subscribe(data => {
        if (!data['error']) {
          localStorage.setItem('user-session', JSON.stringify(data['data']))
          localStorage.setItem('user-token', JSON.stringify(data['token']))
          console.log(data['data']);
          this.router.navigateByUrl('/dashboard')
        } else {
          this.notification.showNotification(data['data'], NotificationType.WARNING, 2000)
          console.log(data['data']);
        }
      }).add(() => this.loading = false)
    } else {
      this.notification.showNotification('Ingresa datos validos', NotificationType.DANGER, 1000, 'bottom')
    }
  }

}
