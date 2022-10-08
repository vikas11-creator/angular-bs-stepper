import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { Stepper1Component } from '../stepper-1/stepper-1.component';
import { Stepper2Component } from '../stepper-2/stepper-2.component';
import { Stepper3Component } from '../stepper-3/stepper-3.component';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  private stepper: Stepper;
  step = 0;
  progressStep = 0;
  percent = this.progressStep * 16.66;
  @ViewChild(Stepper1Component) workFlowDetails: Stepper1Component;
  @ViewChild(Stepper2Component) userSelection: Stepper2Component;
  @ViewChild(Stepper3Component) dctSelection: Stepper3Component;
  constructor(private router: Router) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('.stepper'), {
      linear: false,
      animation: true,
    });
  }

  cancel() {
    this.router.navigate(['']);
  }

  stepperMove(data) {
    if (data.step == 1) {
      this.stepper.to(1);
      //this.workFlowDetails.getWorkFlowInfo();
    } else if (data.step == 2) {
      console.log('dct step 2');
      this.stepper.to(2);
      // this.dctSelection.getWorkFlowInfo();
      // this.dctSelection.getDctsAll();
    } else {
      this.stepper.to(3);
      //this.userSelection.getWorkFlowInfo();
    }
  }

  getWorkFlowInfo(data) {
    this.stepperMove(data);
    this.step = data.step;
    this.progressStep = data.progressStep;
    this.percent = this.progressStep ? (this.progressStep - 1) * 20 : 0;
  }
}
