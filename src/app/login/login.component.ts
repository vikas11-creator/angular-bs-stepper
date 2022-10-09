import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSubmitAttempt: boolean = false;
  loginForm: FormGroup;
  workflowId: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.logForm();
  }

  logForm() {
    this.loginForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}