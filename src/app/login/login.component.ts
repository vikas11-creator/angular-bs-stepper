import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formSubmitAttempt: boolean = false;
  loginForm: FormGroup;
  workflowId: number = 0;
  eyeButton: boolean = false;
  password: string = 'password';
  iconShow: boolean = true;
  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.logForm();
  }

  logForm() {
    this.loginForm = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(formVal) {
    this.formSubmitAttempt = true;
    this.iconShow = false;
    if (this.loginForm.invalid) {
      return;
    }
  }

  togglePassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.eyeButton = true;
    } else {
      this.password = 'password';
      this.eyeButton = false;
    }
  }
}
