import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-checkboxwithngforanotherway',
  templateUrl: './checkboxwithngforanotherway.component.html',
  styleUrls: ['./checkboxwithngforanotherway.component.css']
})
export class CheckboxwithngforanotherwayComponent implements OnInit {
  dataSet: any[] = [];
  tableColumnArray: any[] = [];
  filteredArray: any[] = [];
  uncheckedArray: any[] = [];
  dynamicDataTable!: FormGroup;
  tableValue: any;
  constructor(private fb: FormBuilder,) {}

  ngOnInit() {
    this.dynamicColumn();
    this.initForm();
    this.getFormArray();
  }

  dynamicColumn() {
    this.dataSet = [
      {
        field: 'userName',
        header: 'Employee ID',
        type: 'text',
        display: true,
        order: 1,
        sort: true,
        width: '180px',
        isChecked: true,
        isCheckBox: 'default',
        id: '1',
      },
      {
        field: 'firstName',
        header: 'Name',
        type: 'text',
        display: true,
        order: 2,
        sort: true,
        width: '180px',
        isChecked: true,
        isCheckBox: 'default',
        id: '2',
      },
      {
        field: 'emailId',
        header: 'Email ID',
        type: 'text',
        display: true,
        order: 3,
        sort: true,
        width: '180px',
        isChecked: true,
        isCheckBox: 'default',
        id: '3',
      },
      {
        field: 'enableValue',
        header: 'Status',
        type: 'text',
        display: true,
        sort: false,
        order: 4,
        width: '180px',
        isChecked: true,
        isCheckBox: 'default',
        id: '4',
      },
      {
        field: 'elllipses',
        header: '',
        type: 'text',
        display: true,
        sort: false,
        order: 10,
        isChecked: true,
        id: '7',
      },
      {
        field: 'managerFirstName',
        header: 'Manager',
        type: 'text',
        display: false,
        sort: true,
        order: 5,
        width: '180px',
        isChecked: false,
        isCheckBox: 'dynamic',
        id: '5',
      },
      {
        field: 'designation',
        header: 'Designation',
        type: 'text',
        display: false,
        sort: true,
        order: 6,
        width: '180px',
        isChecked: false,
        isCheckBox: 'dynamic',
        id: '6',
      },
    ];
    this.tableColumnArray = _.cloneDeep(this.dataSet);
    this.dataSet = this.dataSet.sort(({ order: a }, { order: b }) => a - b);
  }

  initForm() {
    let activeField: any = new FormArray([]);
    let inactiveField: any = new FormArray([]);
    for (let i = 0; i < this.dataSet.length; i++) {
      let fg = new FormGroup({});
      if (this.dataSet[i].isCheckBox == 'default') {
        fg.addControl(
          this.dataSet[i].header,
          new FormControl(this.dataSet[i].display)
        );
        activeField.push(fg);
      } else if (this.dataSet[i].isCheckBox == 'dynamic') {
        fg.addControl(
          this.dataSet[i].header,
          new FormControl(this.dataSet[i].display)
        );
        inactiveField.push(fg);
      }
    }
    this.dynamicDataTable = this.fb.group({
      activeFields: activeField,
      inactiveFields: inactiveField,
    });
  }

  getFormArray() {
    this.filteredArray = _.filter(this.tableColumnArray, (o) => {
      if (o.display && o.header !== '') {
        return o;
      }
    });
    this.uncheckedArray = _.filter(this.tableColumnArray, (o) => {
      if (!o.display) {
        return o;
      }
    });
  }

  onSubmit(form: any) {
    this.dataSet.forEach((element: any) => {
      form.value.activeFields.forEach((e: any) => {
        if (e.hasOwnProperty(element.header)) {
          element.display = e[element.header];
        }
      });
    });
    this.dataSet.forEach((element: any) => {
      form.value.inactiveFields.forEach((e: any) => {
        if (e.hasOwnProperty(element.header)) {
          element.display = e[element.header];
        }
      });
    });
  }
}