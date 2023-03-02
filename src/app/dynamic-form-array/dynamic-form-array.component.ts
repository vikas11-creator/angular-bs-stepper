import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html',
  styleUrls: ['./dynamic-form-array.component.css'],
})
export class DynamicFormArrayComponent implements OnInit {
  dynamicArray: any[] = [];
  inputOutputForm: FormGroup;
  inputOutputData: any = [];
  productTypeList: any[] = [];
  obj = {};
  constructor(private fb: FormBuilder) {}

  async ngOnInit() {
    this.dynamicArray = [
      {
        id: 48,
        modelId: 162,
        paramName: 'id',
        paramType: 'integer',
        source: null,
        value1: null,
        value2: null,
        createdDate: '2023-03-02T09:34:27.748099',
        createdBy: 'sampann',
        lastModifiedDate: '2023-03-02T09:34:27.748104',
        lastModifiedBy: 'sampann',
      },
      {
        id: 49,
        modelId: 162,
        paramName: 'name',
        paramType: 'string',
        source: null,
        value1: null,
        value2: null,
        createdDate: '2023-03-02T09:34:27.749279',
        createdBy: 'sampann',
        lastModifiedDate: '2023-03-02T09:34:27.749282',
        lastModifiedBy: 'sampann',
      },
      {
        id: 50,
        modelId: 162,
        paramName: 'age',
        paramType: 'integer',
        source: null,
        value1: null,
        value2: null,
        createdDate: '2023-03-02T09:34:27.750054',
        createdBy: 'sampann',
        lastModifiedDate: '2023-03-02T09:34:27.750057',
        lastModifiedBy: 'sampann',
      },
      {
        id: 51,
        modelId: 162,
        paramName: 'gender',
        paramType: 'string',
        source: null,
        value1: null,
        value2: null,
        createdDate: '2023-03-02T09:34:27.750927',
        createdBy: 'sampann',
        lastModifiedDate: '2023-03-02T09:34:27.75093',
        lastModifiedBy: 'sampann',
      },
    ];
    this.prepareForm();
    this.getValueOneDropdown();
    await this.getInputOutputData();
  }

  prepareForm(): void {
    this.inputOutputForm = this.fb.group({
      inputOutputArray: this.fb.array([]),
    });
  }

  getValueOneDropdown(): any {
    //this.httpService.getData(PATH.MLCINPUTOUTPUTDROPDOWN).subscribe((res: any) => {
    let res = [
      'TestLiquibase',
      'workflow_assignment_approvals',
      'empliquibase',
      'entity',
      'input',
      'input_rules',
      'inputdata',
      'inputdatalatest',
      'inputdatalatest2',
    ];
    res.forEach((element: any) => {
      this.productTypeList.push({ key: 'ratingmodel', value: element });
    });
    //})
  }

  get inputOutputArray(): FormArray {
    return this.inputOutputForm.get('inputOutputArray') as FormArray;
  }

  getInputOutputData() {
    //API CALL
    //this.httpService.postData(PATH.MLCINPUTOUTPUTDATA, payload).subscribe((res: any) => {
    this.inputOutputData = this.dynamicArray;
    this.inputOutputData.forEach((element) => {
      this.addNewRow(element);
    });
    // })
  }

  addNewRow(data): void {
    this.inputOutputArray.push(this.createRow(data));
  }

  createRow(data) {
    return this.fb.group({
      paramName: [data.paramName, { validators: [Validators.required] }],
      source: [data.source, { validators: [Validators.required] }],
      value1: [data.value1, { validators: [Validators.required] }],
      value2: [data.value2, { validators: [Validators.required] }],
    });
  }

  getDropDownVal(event, i) {
    this.obj[event.value] = [];
    //this.httpService.getData(`${PATH.INPUTOUTPUTDROPDOWNVALUE}/${event.value}`).subscribe((res: any) => {
    let res: any = [
      'id',
      'entity_type_id',
      'ccy_id',
      'cntry_id',
      'branch_area',
      'entity_name',
      'staff_count',
      'entity_cd',
      'entity_parent',
    ];
    res.forEach((element: any) => {
      this.obj[event.value].push({ key: 'label', value: element });
    });
    // })
  }

  getValueTypeList(key) {
    return this.obj[key];
  }

  submitForm() {}
}
