import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component extends BaseComponent  implements OnInit {

  constructor(public router: Router) {
    super(router);

   }

  ngOnInit() {
  }

}