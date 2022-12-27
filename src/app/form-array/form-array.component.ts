import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css'],
})
export class FormArrayComponent implements OnInit {
  // basicSettingsForm:any;
  // keyContacts:FormArray;
  // constructor( private formbuilder : FormBuilder,
  //   private router :Router,
  //   private route: ActivatedRoute,) { }

  // ngOnInit() {
  // }
  // getBasicSettingForm(){
  //   this.basicSettingsForm=this.formbuilder.group({
  //     reminder:['',[Validators.required]],
  //     contractDocument:[''],
  //     keyContacts: this.formbuilder.array([this.createItem(null)])
  //   })
  // }

  // createItem(data){
  //   return this.formbuilder.group({
  //     name:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
  //     emailId:["",[Validators.required,Validators.maxLength(80)]],
  //     phoneNumber:["",[Validators.required]],
  //   });
  // }

  // addItem(){
  //   this.keyContacts = this.basicSettingsForm.get('keyContacts') as FormArray;
  //   this.keyContacts.push(this.createItem(null));
  // }

  // removeBtn(index: number){
  //   this.keyContacts?.removeAt(index)
  // }
  //survey!: FormGroup;
  myForm!: FormGroup;
  isChange: boolean = false;
  isformStart: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  changeEvent(event: any) {
    console.log(event.target.value);
    let value = event.target.value;
    // if(value){
    this.isChange = true;
    //this.createPeopleArray()
    //this.createPeopleArray();
    //}
  }

  callForm(type: any) {
    console.log('ghgjj');
    // console.log(formControlName)
    if (type == 'male') {
      this.isformStart = true;
      this.createForm();
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      filterField: ['', [Validators.required]],
      // genderControl: ['', [Validators.required]],
      people: this.fb.array([this.createPeopleArray()]),
    });
  }

  createNew() {
    return this.fb.group({
      name: null,
      addresses: new FormArray([this.createAddressArray()]),
    });
  }

  createPeopleArray() {
    // if(this.isChange){
    return this.fb.group({
      name: null,
      addresses: new FormArray([this.createAddressArray()]),
    });
    //}
  }

  getPeople(form) {
    return form.controls.people.controls;
  }

  getAddress(form) {
    return form.controls.addresses.controls;
  }

  createAddressArray() {
    return this.fb.group({
      genderControl: [''],
      Ys: this.fb.array([]),
    });
  }

  initY() {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
      Y1: ['Y1', [Validators.required, Validators.pattern('[0-9]{3}')]],
      Y2: ['Y2', [Validators.required, Validators.pattern('[0-9]{3}')]],
      // ---------------------------------------------------------------------
      //Zs: this.fb.array([this.initZ()]),
    });
  }

  addPeople() {
    const control = <FormArray>this.myForm.get('people');
    control.push(this.createPeopleArray());
  }

  addAddress(i) {
    const control = <FormArray>(
      this.myForm.get('people').controls[i].get('addresses')
    );
    // console.log(control);
    control.push(this.createNew());
    console.log(this.myForm.get('people').controls[i]);
  }

  submit(myForm) {
    console.log(myForm);
  }
}
