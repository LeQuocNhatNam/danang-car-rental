import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityAuthenticationRoutingModule } from './security-authentication-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [ChangePasswordComponent, ForgotPasswordComponent, LoginComponent],
  imports: [
    CommonModule,
    SecurityAuthenticationRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class SecurityAuthenticationModule { }
