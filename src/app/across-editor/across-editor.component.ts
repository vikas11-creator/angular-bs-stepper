import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { ValueTransformer } from '@angular/compiler/src/util';
@Component({
  selector: 'app-across-editor',
  templateUrl: './across-editor.component.html',
  styleUrls: ['./across-editor.component.css'],
})
export class AcrossEditorComponent implements OnInit {
  checked = true;
  merge: boolean;
  mergeList = [];
  merged: any = [];
  validMerge: boolean;
  cols: any = [];
  colLength: any;
  isLoad: boolean = false;
  indexList: any = [];
  localTableArray: any = {};
  clickedCellIndex: any = [];
  isAdd: boolean = false;
  ids: any = [];
  constructor(
    private formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  public componentForm = this.formbuilder.group({
    id: uuidv4(),
    row: [],
    column: [],
    rows: this.formbuilder.array([]),
  });

  public labelType = {
    label: 'Label Title',
    dropDown: 'Dropdown Type',
    input: 'Input Type',
  };

  ngOnInit() {
    this.merge = false;
    this.validMerge = false;
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  sortIds() {
    this.componentForm.value.rows.forEach((elem: any, i: number) => {
      elem.columns.forEach((el: any, j: number) => {
        this.ids.push(el.id);
      });
    });
  }

  getCellDetail(compType, index) {
    // console.log('this.componentForm.value.rows', this.componentForm.value.rows);
    compType.value.checked = !compType.value.checked;
    if (this.localTableArray[index]?.length > 0) {
    } else {
      this.localTableArray[index] = [];
    }
    if (compType.value.checked) {
      this.clickedCellIndex.push(index);
      this.localTableArray[index].push(compType.value);
    } else {
      this.localTableArray[index].splice(
        this.localTableArray[index].findIndex((el: any) => {
          return el.id == compType.value.id;
        }),
        1
      );
      if (this.localTableArray[index].length == 0) {
        delete this.localTableArray[index];
      }
    }
    Object.entries(this.localTableArray).forEach(([key, value]: any) => {
      value.sort((a, b) => this.ids.indexOf(a.id) - this.ids.indexOf(b.id));
    });
  }

  mergeData() {
    let ind: number;
    let found: any = {};
    let colspanSum;
    let rowspanSum;
    let key: any = Object.keys(this.localTableArray);
    let min = Math.min(...key);
    colspanSum = this.localTableArray[min].reduce(
      (accumulator, currentValue) => accumulator + currentValue.colspan,
      0
    );
    let rowspanArray: any = [];
    Object.entries(this.localTableArray).forEach(([key, value]: any) => {
      if (value.length > 0) {
        rowspanArray.push(value[0].rowspan);
      }
    });
    rowspanSum = rowspanArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    if (this.getMergeValidation(this.localTableArray)) {
      if (colspanSum) {
        this.localTableArray[min].map((element: any) => {
          if (Object.keys(found).length == 0) {
            this.componentForm.value.rows.map((elem: any, i: number) => {
              if (Object.keys(found).length == 0) {
                found = elem.columns.find((el: any, j: number) => {
                  ind = j;
                  return el.id == element.id;
                });
                if (found == undefined) {
                  found = {};
                }
                if (
                  this.isValidInput(found) &&
                  Object.keys(found).length !== 0
                ) {
                  const control: any = (<FormArray>(
                    this.componentForm.controls['rows']
                  ))
                    .at(i)
                    .get('columns') as FormArray;
                  found.colspan = colspanSum;
                  elem.columns.splice(
                    ind + 1,
                    this.localTableArray[min].length - 1
                  );
                  control.controls.splice(
                    ind + 1,
                    this.localTableArray[min].length - 1
                  );
                }
              }
            });
          }
        });
      }

      let rowFound: any = {};
      if (rowspanSum) {
        Object.entries(this.localTableArray).forEach(
          ([key, value]: any, j: number) => {
            if (Object.keys(rowFound).length == 0 && j == 0) {
              value.forEach((element: any) => {
                this.componentForm.value.rows.map((elem: any, i: number) => {
                  if (Object.keys(rowFound).length == 0) {
                    rowFound = elem.columns.find((el: any, j: number) => {
                      ind = j;
                      return el.id == element.id;
                    });
                    if (rowFound == undefined) {
                      rowFound = {};
                    }
                    if (
                      this.isValidInput(rowFound) &&
                      Object.keys(rowFound).length !== 0
                    ) {
                      rowFound.rowspan = rowspanSum;
                    }
                  }
                });
              });
            }
            if (j !== 0) {
              value.forEach((element: any) => {
                this.componentForm.value.rows.map(
                  (elem: any, i: number, arr: any) => {
                    const control: any = (<FormArray>(
                      this.componentForm.controls['rows']
                    ))
                      .at(key)
                      .get('columns') as FormArray;
                    let ind = elem.columns.findIndex((el: any, j: number) => {
                      return el.id == element.id;
                    });
                    if (ind !== -1) {
                      control.controls.splice(ind, 1);
                      arr[key].columns.splice(ind, 1);
                    }
                  }
                );
              });
            }
          }
        );
      }
      this.resetTable();
    }
  }

  getMergeValidation(obj: any) {
    let condtionEqualLength = Object.values(obj).every(
      (el: any, i: number, arr: any) => {
        let len = arr[0].length;
        return el.length == len;
      }
    );
    if (condtionEqualLength) {
      let status = this.getConsecutiveStatus();
      return status;
    } else {
      this.resetTable();
      alert('merging cell does not have equal length');
      return false;
    }
  }

  getConsecutiveStatus() {
    let consecutiveObj: any = {};
    Object.entries(this.localTableArray).forEach(([key, value]: any) => {
      consecutiveObj[key] = [];
      value.forEach((el: any) => {
        this.componentForm.value.rows.forEach((elem: any) => {
          let index = elem.columns.findIndex((e: any) => {
            return e.id == el.id;
          });
          if(index>=0){
            consecutiveObj[key].push(index);
          }
        });
      });
    });
    Object.entries(consecutiveObj).forEach(([key, value]: any) => {
     this.getForStatus(value);
    })
    return true;
  }

  breakLoop: boolean = true;
  getForStatus(consecutiveIndex) {
    let flag = false;
    if(this.breakLoop){
      for (let i = 1; i < consecutiveIndex.length; i++) {
        if (consecutiveIndex[i] != consecutiveIndex[i - 1] + 1) {
          this.resetTable();
          this.breakLoop = false;
          alert('merge elements are not consecutive');
          return flag;
        }
      }
      flag = true;
      return flag;
    }else{
      return flag;
    }
  }

  resetTable() {
    this.componentForm.value.rows.map((elem: any, i: number) => {
      const control: any = (<FormArray>this.componentForm.controls['rows'])
        .at(i)
        .get('columns') as FormArray;
      control.controls.forEach((el: any) => {
        el.value.checked = false;
      });
    });
    this.localTableArray = [];
    this.clickedCellIndex = [];
  }

  getRowProperty(e, i, type) {
    if (type == 'bgColor' || type == 'textColor') {
      let colorArr: any = [];
      colorArr.push(e.value);
      this.setRowProperty(type, i, colorArr);
    } else {
      this.setRowProperty(type, i, e.value);
    }
  }

  setRowProperty(type, index, arr) {
    let lastColor: any;
    if (type == 'bgColor' || type == 'textColor') {
      lastColor = arr.slice(-1).pop();
    }
    switch (type) {
      case 'bgColor':
        this.componentForm.value.rows[index]['columns'].forEach((el: any) => {
          el[type] = lastColor;
        });
        break;
      case 'textColor':
        this.componentForm.value.rows[index]['columns'].forEach((el: any) => {
          el[type] = lastColor;
        });
        break;
      case 'colType':
        const control = (<FormArray>this.componentForm.controls['rows'])
          .at(index)
          .get('columns') as FormArray;
        control.controls.forEach((el: any, i: any) => {
          el.controls[type].value = arr;
          el.value[type] = arr;
        });
        break;
      case 'fontSize':
        this.componentForm.value.rows[index]['columns'].forEach((el: any) => {
          el[type] = arr;
        });
        break;
      default:
        break;
    }
  }

  addMoreRows() {
    this.componentForm.value.rows.length = this.componentForm.value.rows
      .length++;
    this.tableRowControls.push(this.createRow());
    for (var j = 0; j < this.componentForm.value.column; j++) {
      const control = (<FormArray>this.componentForm.controls['rows'])
        .at(this.componentForm.value.rows.length - 1)
        .get('columns') as FormArray;
      control.push(this.createColumn());
    }
  }

  public get tableRowControls() {
    return this.componentForm.get('rows') as FormArray;
  }

  createTable() {
    for (var i = 0; i < this.componentForm.value.row; i++) {
      this.tableRowControls.push(this.createRow());
      for (var j = 0; j < this.componentForm.value.column; j++) {
        const control = (<FormArray>this.componentForm.controls['rows'])
          .at(i)
          .get('columns') as FormArray;
        control.push(this.createColumn());
      }
    }
    this.isAdd = true;
  }

  createRow(): FormGroup {
    return this.formbuilder.group({
      id: uuidv4(),
      property: [],
      columns: this.formbuilder.array([]),
    });
  }

  createColumn(): FormGroup {
    return this.formbuilder.group({
      id: uuidv4(),
      title: [],
      value: [],
      colType: [],
      colspan: [1],
      rowspan: [1],
      textColor: [],
      bgColor: [],
      checked: [],
      fontSize: [],
    });
  }

  postData() {
    console.log(this.componentForm);
  }

  getColumnCount() {
    if (this.componentForm.value.row) {
      this.componentForm.get('rows')['controls'] = [];
      this.createTable();
      this.sortIds();
    }
  }

  getRowCount() {
    if (this.componentForm.value.column) {
      this.componentForm.get('rows')['controls'] = [];
      this.createTable();
      this.sortIds();
    }
  }

  products: any = [
    { name: 'Label', value: 'label' },
    { name: 'Dropdown', value: 'dropDown' },
    { name: 'Input', value: 'input' },
  ];

  fontSize: any = [
    { name: '14px', value: '14px' },
    { name: '16px', value: '16px' },
    { name: '18px', value: '18px' },
  ];

  isValidInput(input) {
    if (this.isNull(input) || this.isUndefined(input) || this.isEmpty(input)) {
      return false;
    } else {
      return true;
    }
  }

  isUndefined(input) {
    if (typeof input === 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  isNull(input) {
    if (input != null) {
      return false;
    } else {
      return true;
    }
  }

  isEmpty(input) {
    if (typeof input === 'undefined') {
      return true;
    } else {
      let lstrTempstring = String(input);
      lstrTempstring = lstrTempstring.trim();
      if (lstrTempstring === '' || lstrTempstring === 'undefined') {
        return true;
      } else {
        return false;
      }
    }
  }
}
