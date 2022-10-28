import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  basicSettingsForm:any;
  keyContacts:FormArray;
  constructor( private formbuilder : FormBuilder, 
    private router :Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
  }
  getBasicSettingForm(){
    this.basicSettingsForm=this.formbuilder.group({
      reminder:['',[Validators.required]],
      contractDocument:[''],
      keyContacts: this.formbuilder.array([this.createItem(null)])
    })
  }

  createItem(data){
    return this.formbuilder.group({
      name:["",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      emailId:["",[Validators.required,Validators.maxLength(80)]],
      phoneNumber:["",[Validators.required]],
    });
  }

  addItem(){
    this.keyContacts = this.basicSettingsForm.get('keyContacts') as FormArray;
    this.keyContacts.push(this.createItem(null));
  }

  removeBtn(index: number){
    this.keyContacts?.removeAt(index)
  }
}