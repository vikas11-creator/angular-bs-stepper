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

  getCellDetail(compType, index) {
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
    }
    console.log(this.localTableArray);
  }

  mergeData() {
    let ind: number;
    let found: any = {};
    let colspanSum;
    let rowspanSum;
    // console.log(Object.keys(this.localTableArray));
    let key: any = Object.keys(this.localTableArray);
    let value = Object.values(this.localTableArray);
    // console.log(key);
    // console.log(value);
    let min = Math.min(...key);
    colspanSum = this.localTableArray[min].reduce(
      (accumulator, currentValue) => accumulator + currentValue.colspan,
      0
    );
    let rowspanArray: any = [];
    Object.entries(this.localTableArray).forEach(([key, value]: any) => {
      console.log(value);
      if (value.length > 0) {
        rowspanArray.push(value[0].rowspan);
      }
    });
    rowspanSum = rowspanArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log(colspanSum);
    console.log('rowspanSum', rowspanSum);
    // if (this.getMergeValidation()) {
    //   let ind: number;
    //   let found: any = {};
    //   const sumWithInitial = this.localTableArray.reduce(
    //     (accumulator, currentValue) => accumulator + currentValue.colspan,
    //     0
    //   );
    //   this.localTableArray.map((element: any) => {
    //     if (Object.keys(found).length == 0) {
    //       this.componentForm.value.rows.map((elem: any, i: number) => {
    //         if (Object.keys(found).length == 0) {
    //           found = elem.columns.find((el: any, j: number) => {
    //             ind = j;
    //             return el.id == element.id;
    //           });
    //           if (found == undefined) {
    //             found = {};
    //           }
    //           if (this.isValidInput(found) && Object.keys(found).length !== 0) {
    //             const control: any = (<FormArray>(
    //               this.componentForm.controls['rows']
    //             ))
    //               .at(i)
    //               .get('columns') as FormArray;
    //             found.colspan = sumWithInitial;
    //             elem.columns.splice(ind + 1, this.localTableArray.length - 1);
    //             control.controls.splice(
    //               ind + 1,
    //               this.localTableArray.length - 1
    //             );
    //             this.resetTable();
    //           }
    //         }
    //       });
    //     }
    //   });
    // }
    console.log('this.componentForm.value.rows', this.componentForm.value.rows);
  }

  getMergeValidation() {
    console.log('this.clickedCellIndex', this.clickedCellIndex);
    const everyVal = this.clickedCellIndex.every((el: any) => {
      return el == this.clickedCellIndex[0];
    });
    if (!everyVal) {
      this.resetTable();
      alert('cannot merge across cell');
      return false;
    } else {
      let status = this.getConsecutiveStatus();
      return status;
    }
  }

  getConsecutiveStatus() {
    let consecutiveIndex: any = [];
    this.localTableArray.forEach((e: any) => {
      let ind = this.componentForm.value.rows[
        this.clickedCellIndex[0]
      ].columns.findIndex((el: any) => {
        return el.id == e.id;
      });
      consecutiveIndex.push(ind);
      if (consecutiveIndex.length == this.localTableArray.length) {
        consecutiveIndex.sort();
        this.getForStatus(consecutiveIndex);
      }
    });
    return true;
  }

  getForStatus(consecutiveIndex) {
    let flag = false;
    for (let i = 1; i < consecutiveIndex.length; i++) {
      if (consecutiveIndex[i] != consecutiveIndex[i - 1] + 1) {
        this.resetTable();
        alert('merge elements are not consecutive');
        return flag;
      }
    }
    flag = true;
    return flag;
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
    }
  }

  getRowCount() {
    if (this.componentForm.value.column) {
      this.componentForm.get('rows')['controls'] = [];
      this.createTable();
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
