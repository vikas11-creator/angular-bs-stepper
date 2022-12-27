import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
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
  survey: FormGroup;
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      people: this.fb.array([this.createPeopleArray()])
    })
  }

  createPeopleArray() {
    return this.fb.group({
      name: null,
      addresses: new FormArray([
        this.createAddressArray()
      ])
    });
  }

  getPeople(form) {
    return form.controls.people.controls;
  }

  getAddress(form) {
    return form.controls.addresses.controls;
  }

  createAddressArray() {
    return this.fb.group({
      houseNo: null,
      city: null
    })
  }

  addPeople() {
    const control = <FormArray>this.myForm.get('people');
    control.push(this.createPeopleArray());
  }

  addAddress(i) {
    const control = <FormArray>this.myForm.get('people').controls[i].get('addresses');
    // console.log(control);
    control.push(this.createAddressArray());
  }

  submit() {
    console.log(this.myForm.value)
  }
}