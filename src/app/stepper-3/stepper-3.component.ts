import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper-3',
  templateUrl: './stepper-3.component.html',
  styleUrls: ['./stepper-3.component.css'],
})
export class Stepper3Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  save() {
    this.router.navigate(['']);
  }
}
