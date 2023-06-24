import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  checked = true;
  merge: boolean;
  mergeList = [];
  merged: any = [];
  validMerge: boolean;
  cols: any = [];
  colLength: any;
  isLoad: boolean = false;
  indexList: any = [];
  localTableArray: any = [];
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

  getCellDetail(compType) {
    console.log(compType.value);
    compType.value.checked = !compType.value.checked;
    if (compType.value.checked) {
      this.localTableArray.push(compType.value);
    } else {
      this.localTableArray.splice(
        this.localTableArray.findIndex((el: any) => {
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
    const sumWithInitial = this.localTableArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue.colspan,
      0
    );
    this.localTableArray.map((element: any) => {
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
            if (this.isValidInput(found) && Object.keys(found).length !== 0) {
              found.colspan = sumWithInitial;
              // found.controls.colspan.value = sumWithInitial;
              elem.columns.splice(ind + 1, this.localTableArray.length - 1);
              const control: any = (<FormArray>(
                this.componentForm.controls['rows']
              ))
                .at(i)
                .get('columns') as FormArray;
              control.controls.forEach((el: any) => {
                el.value.checked = false;
              });
              control.controls.splice(ind + 1, this.localTableArray.length - 1);
              console.log(control.controls);
              this.localTableArray = [];
            }
          }
        });
      }
    });
  }

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
      textColor: [],
      bgColor: [],
      checked: [],
      fontSize: [],
    });
  }

  postData() {}

  getColumnCount() {
    this.createTable();
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

  getRowCount() {}

  //subham code
  // mergeColumns() {
  //   if (this.validateMerge()) {
  //     let mergeIndex = Number(Math.min(...this.indexList));
  //     this.selectedCells.forEach((data: any) => {
  //       this.tableRowControls['controls'].forEach((rowControl) => {
  //         rowControl
  //           .get('columns')
  //           ['controls'].forEach((columnControl: any, i: any) => {
  //             if (_.isEqual(columnControl.value, data)) {
  //               if (mergeIndex != i) {
  //                 _.remove(
  //                   rowControl.get('columns')['controls'],
  //                   (element: any) => _.isEqual(element.value, data)
  //                 );
  //                 _.remove(rowControl.get('columns')['value'], (element: any) =>
  //                   _.isEqual(element, data)
  //                 );
  //               } else {
  //                 this.setColSpan(columnControl, this.selectedCells);
  //               }
  //             }
  //           });
  //       });
  //     });
  //     this.selectedCells = [];
  //     this.indexList = [];
  //   } else {
  //     this.indexList = [];
  //     this.selectedCells.forEach((cell: any) => {
  //       cell.checked = false;
  //     });
  //     this.selectedCells = [];
  //     return;
  //   }
  // }

  // setColSpan(cell, length) {
  //   let sumWithInitial = this.selectedCells.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue.colspan,
  //     0
  //   );
  //   if (cell.controls.colspan.value) {
  //     cell.controls.colspan.value = sumWithInitial;
  //   }
  //   if (cell.value) {
  //     cell.value.colspan = sumWithInitial;
  //     cell.value.checked = false;
  //   }
  // }

  // validateMerge() {
  //   let flag: boolean = false;
  //   let rowFlag: boolean = false;
  //   let adjFlag: boolean = false;
  //   let indexArr: any = [];
  //   let adjacentArr: any = [];
  //   //code for across rows
  //   this.selectedCells.forEach((cell: any) => {
  //     this.componentForm.value.rows.forEach((row: any, index: any) => {
  //       if (row.columns.includes(cell)) {
  //         indexArr.push(index);
  //       }
  //     });
  //   });
  //   this.componentForm.value.rows.forEach((row: any) => {
  //     row.columns.forEach((column: any, index: number) => {
  //       if (this.selectedCells.includes(column)) {
  //         adjacentArr.push(index);
  //       }
  //     });
  //   });
  //   _.uniq(indexArr).length == 1 ? (rowFlag = true) : '';
  //   adjFlag = this.sequntialIndices(adjacentArr, adjacentArr.length);
  //   adjFlag == true && rowFlag == true ? (flag = true) : (flag = false);
  //   return flag;
  // }

  // sequntialIndices(arr: any, n: any) {
  //   arr.sort();
  //   for (let i = 1; i < n; i++) if (arr[i] != arr[i - 1] + 1) return false;
  //   return true;
  // }
}
