import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  headerGroupList: any = [];
  componentList: any = [];
  fieldTypeList: any = [];
  containerList: any = [];
  tabList: any = [];
  formList: any = [];
  infoId: string = '';
  componentType: string;
  editorType: any;
  infoData: any;
  isEdit: boolean = false;
  checked = true;
  categories: any[];
  userData: any;
  merge: boolean;
  mergeList = [];
  merged: any = [];
  validMerge: boolean;
  cols: any = [];
  colLength: any;
  isLoad: boolean = false;
  selectedCells: any = [];
  indexList: any = [];

  constructor(
    private formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

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

  cellClicked(data: any, index: number) {
    data.value.checked
      ? (data.value.checked = !data.value.checked)
      : (data.value.checked = true);
    this.selectedCells.includes(data.value)
      ? _.remove(this.selectedCells, (element: any) =>
          _.isEqual(element, data.value)
        )
      : this.selectedCells.push(data.value);
    this.indexList.includes(index)
      ? _.remove(this.indexList, (element: any) => _.isEqual(element, index))
      : this.indexList.push(index);
  }

  mergeColumns() {
    if (this.validateMerge()) {
      let mergeIndex = Number(Math.min(...this.indexList));
      this.selectedCells.forEach((data: any) => {
        this.tableRowControls['controls'].forEach((rowControl) => {
          rowControl
            .get('columns')
            ['controls'].forEach((columnControl: any, i: any) => {
              if (_.isEqual(columnControl.value, data)) {
                if (mergeIndex != i) {
                  _.remove(
                    rowControl.get('columns')['controls'],
                    (element: any) => _.isEqual(element.value, data)
                  );
                  _.remove(rowControl.get('columns')['value'], (element: any) =>
                    _.isEqual(element, data)
                  );
                } else {
                  this.setColSpan(columnControl, this.selectedCells);
                }
              }
            });
        });
      });
      this.selectedCells = [];
      this.indexList = [];
    } else {
      this.indexList = [];
      this.selectedCells.forEach((cell: any) => {
        cell.checked = false;
      });
      this.selectedCells = [];
      return;
    }
  }

  setColSpan(cell, length) {
    let sumWithInitial = this.selectedCells.reduce(
      (accumulator, currentValue) => accumulator + currentValue.colspan,
      0
    );
    if (cell.controls.colspan.value) {
      cell.controls.colspan.value = sumWithInitial;
    }
    if (cell.value) {
      cell.value.colspan = sumWithInitial;
      cell.value.checked = false;
    }
  }

  validateMerge() {
    let flag: boolean = false;
    let rowFlag: boolean = false;
    let adjFlag: boolean = false;
    let indexArr: any = [];
    let adjacentArr: any = [];
    //code for across rows
    this.selectedCells.forEach((cell: any) => {
      this.componentForm.value.rows.forEach((row: any, index: any) => {
        if (row.columns.includes(cell)) {
          indexArr.push(index);
        }
      });
    });
    this.componentForm.value.rows.forEach((row: any) => {
      row.columns.forEach((column: any, index: number) => {
        if (this.selectedCells.includes(column)) {
          adjacentArr.push(index);
        }
      });
    });
    _.uniq(indexArr).length == 1 ? (rowFlag = true) : '';
    adjFlag = this.sequntialIndices(adjacentArr, adjacentArr.length);
    adjFlag == true && rowFlag == true ? (flag = true) : (flag = false);
    return flag;
  }

  sequntialIndices(arr: any, n: any) {
    arr.sort();
    for (let i = 1; i < n; i++) if (arr[i] != arr[i - 1] + 1) return false;
    return true;
  }

  changes(ev: any) {
    this.componentType = ev.value;
  }

  postData() {}

  tableCol(i: number) {
    return (<FormArray>this.componentForm.controls['tableRow'])
      .at(i)
      .get('rows') as FormArray;
  }

  onAddRow(data) {
    let gr = this.formbuilder.array([]);
    this.cols.forEach((itm, index) => {
      gr.push(
        this.formbuilder.control(data ? data[index] : [], [Validators.required])
      );
    });
  }

  getColumnCount() {
    this.setColumn();
    this.createTable();
    for (let index = 0; index <= 1; index++) {
      this.onAddRow(null);
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

  getRowCount() {}

  addTableRow() {
    return this.formbuilder.group({
      rows: this.formbuilder.array([]),
    });
  }

  addTableColumn() {
    return this.formbuilder.group({
      title: [''],
      value: [''],
    });
  }

  setColumn() {
    this.cols = [];
    let formVal = this.componentForm.value;
    this.colLength = formVal.column;
    for (let i = 0; i < this.colLength; i++) {
      this.cols.push({
        title: '',
        value: [],
        colType: '',
        colspan: '',
        property: [{ color: '#000', background: '' }],
      });
    }
  }

  toggleCols() {
    this.merge = true;
  }

  mergeCols() {
    let checked: any;
    let data = [];
    checked.forEach((index) => {
      if (typeof index == 'number') {
        if (!data.includes(index)) {
          data.push(index);
        }
      }
    });
    this.mergeList.push(data);
    console.log(this.mergeList);
  }
}