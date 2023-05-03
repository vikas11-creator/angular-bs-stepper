import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-push',
  templateUrl: './input-push.component.html',
  styleUrls: ['./input-push.component.css'],
})
export class InputPushComponent implements OnInit {
  inputForm: FormGroup;
  arr: any[] = [];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.logForm();
  }

  logForm() {
    this.inputForm = this._formBuilder.group({
      inp1: [''],
      inp2: [''],
      inp3: [''],
      total: [''],
    });
  }

  pushData(obj) {
    console.log(obj);
  }

  onSubmit(formVal) {}
}
