import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base/base.component';
@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.css']
})
export class Component3Component extends BaseComponent  implements OnInit {

  constructor(public router: Router) {
    super(router);

   }

  ngOnInit() {
  }

}