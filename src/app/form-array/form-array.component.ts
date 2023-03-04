import { Component, OnInit } from '@angular/core';
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
      //this.createForm2();
      this.addX();
      this.isformStart = true;
    }
    console.log('myForm2', this.myForm);
  }

  callFormCheck(event: any, type: any) {
    console.log(event.target.checked);
    if (type == 'female' && event.target.checked) {
      this.addY();
    }
  }

  callCheckbox(event: any, type: any, iy: any, ix: any, iz: any) {
    console.log(event.target.checked);
    if (type == 'female' && event.target.checked) {
      this.addYD(iz);
    }
    //dekho ki datatype ek hi add hota hai na ki multiple
  }

  addYD(i: any) {
    const control: any = <FormArray>(
      this.myForm.controls['people']['controls'][0]['controls']['Ys'][
        'controls'
      ][0]['controls']['newFilterField']['controls'][i]['controls']['Ys']
    );
    console.log('addYD', control);
    control.push(this.createYsArrayLookUp());
  }

  createYsArrayLookUp() {
    return this.fb.group({
      a: this.fb.array([this.call()]),
    });
  }

  call() {
    return this.fb.group({
      p: [''],
      q: [''],
    });
  }
  createForm() {
    this.myForm = this.fb.group({
      filterFieldStart: ['', [Validators.required]],
      // genderControl: ['', [Validators.required]],
      people: this.fb.array([]),
    });
    console.log('myForm', this.myForm);
  }
  //this.createPeopleArray()

  addX() {
    const control: any = <FormArray>this.myForm.controls['people']['controls'];
    control.push(this.createAddressArray());
  }

  addY() {
    const control: any = <FormArray>(
      this.myForm.controls['people']['controls'][0]['controls']['Ys']
    );
    control.push(this.createYsArray());
  }

  createForm2() {
    this.myForm = this.fb.group({
      people: this.fb.array([this.createPeopleArray()]),
    });
    console.log('myForm2', this.myForm);
  }

  createYsArray() {
    return this.fb.group({
      dataType: [''],
      newFilterField: this.fb.array([]),
    });
  }

  createPeopleArray() {
    return this.fb.group({
      addresses: new FormArray([this.createAddressArray()]),
    });
  }

  createAddressArray() {
    return this.fb.group({
      genderControl: [''],
      filterField: ['', [Validators.required]],
      Ys: this.fb.array([]),
    });
  }
  addDatanewAddArray(d: any, i: any) {
    const control: any = <FormArray>(
      this.myForm.controls['people']['controls'][i]['controls']['Ys'][
        'controls'
      ][0]['controls']['newFilterField']
    );
    console.log('controls', control);
    control.push(this.createAddressArray());
  }

  amd(d: any, i: any, ip: any) {}
  createNew() {
    return this.fb.group({
      name: null,
      addresses: new FormArray([this.createAddressArray()]),
    });
  }

  getPeople(form) {
    console.log('getPeople', form.controls.people.controls);
    return form.controls.people.controls;
  }

  getAddress(form) {
    return form.controls.addresses.controls;
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
