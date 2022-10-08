import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
@Component({
  selector: 'app-stepper-1',
  templateUrl: './stepper-1.component.html',
  styleUrls: ['./stepper-1.component.css'],
})
export class Stepper1Component implements OnInit {
  private stepper: Stepper;
  formSubmitAttempt: boolean = false;
  workFlowForm: FormGroup;
  workflowId: number = 0;
  @Output('getWorkFlowInfo') callParent: EventEmitter<any> = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.flowForm();
  }

  flowForm() {
    this.workFlowForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  get f() {
    return this.workFlowForm.controls;
  }

  onSubmit(form) {
    this.formSubmitAttempt = true;
    //let payload = form.value;
    // if (this.workflowId) {
    //   payload.workflowID = this.workflowId;
    // }
    if (this.workFlowForm.invalid) {
      return;
    } else {
      //this.workflowId ? this.toastr.success("WorkFlow updated successfully", "Success") : this.toastr.success("DCT added successfully", "Success");
      if (this.workflowId) {
        this.router.navigate([`workflow/edit/2/${this.workflowId}`]);
        this.callParent.emit({
          step: 2,
          url: `workflow/edit/2/${this.workflowId}`,
        });
      } else {
        this.router.navigate(['workflow/add/2']);
        this.callParent.emit({
          step: 2,
          url: `workflow/add/2`,
        });
      }
    }
  }
}
