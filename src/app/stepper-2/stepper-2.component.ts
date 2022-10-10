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
    // 0 means false >0 means true
    //value means true and undefinded ,null means false
    // in res el is going to be returned
    //but el belong to newArray's object not myArray's
    //once it enters in filter method there is 2 return method
    //focus on second return if both value matches then it will be true otherwise false
    //if it returns true then first return will return element
    //element is ssame value then ! means it will become false
    //false mean el will not be stored in res
    //in second pass
    let res = [];
    res = this.newArray.filter((el) => {
      return !this.myArray.find((element) => {
        return element.name === el.name;
      });
    });
    if (res.length > 0) {
      this.myArray = this.myArray.concat(res);
    }
  }
}
