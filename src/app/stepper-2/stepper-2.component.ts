import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-2',
  templateUrl: './stepper-2.component.html',
  styleUrls: ['./stepper-2.component.css'],
})
export class Stepper2Component implements OnInit {
  myArray = [
    { id: 1, name: 'bob' },
    { id: 2, name: 'dan' },
    { id: 3, name: 'barb' },
  ];

  newArray = [
    { id: 3, name: 'barb' },
    { id: 4, name: 'xyz' },
  ];
  constructor() {}

  ngOnInit() {}

  push() {
    for (let i = 0; i < this.myArray.length; i++) {
      for (let j = 0; j < this.newArray.length; j++) {
        if (this.myArray[i].id != this.newArray[j].id) {
          
        }else{
          this.myArray.push(this.newArray[j]);
        }
      }
    }
  }
}
