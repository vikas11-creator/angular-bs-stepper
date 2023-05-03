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
    let ind: number;
    if (this.arr.length == 0) {
      this.arr.push(obj);
    } else {
      let check = this.arr.some((el, i) => {
        if (el.x == obj.x) {
          ind = i;
        }
        return el.x == obj.x;
      });
      if (check) {
        this.arr.splice(ind, 1, obj);
      } else {
        this.arr.push(obj);
      }
    }

    let total = this.arr.reduce((acc, current) => {
      return acc + current.v;
    }, 0);

    console.log(total);
  }

  onSubmit(formVal) {}
}
