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
    let res = [];
    res = this.newArray.filter((el) => {
      return !this.myArray.find((element) => {
        return element.name === el.name;
      });
    });
    if (res.length > 0) {
      this.myArray = this.myArray.concat(res);
    }
    // for(let i = 0; i<this.newArray.length; i++){
    //   for(let j = 0; j<this.myArray.length; j++){
    //      if(this.newArray[i] !== this.myArray[j]){
    //       res.push(this.newArray[i])
    //      }
    //   }
    // }
    console.log(this.myArray);
  }
}
