import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-css',
  templateUrl: './new-css.component.html',
  styleUrls: ['./new-css.component.css']
})
export class NewCssComponent implements OnInit {
  data:any = [
    {
      id:1,
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  addBoxes(){
    let l = this.data.length;
    this.data.push({id:l+1});
  }

}