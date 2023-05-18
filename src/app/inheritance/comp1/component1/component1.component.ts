import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component extends BaseComponent implements OnInit {

  constructor(public router: Router) { 
    super(router);
  }

  ngOnInit() {
  }

}