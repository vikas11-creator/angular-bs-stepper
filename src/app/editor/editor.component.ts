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
  fndlFormatedFilteredData: any;

  updateRow(i, j) {
    if (i > 1) {
      let s = i;
      let m = j;
      if (m - 3 >= 0 && s > 1) {
        while (
          s < this.fndlFormatedFilteredData.tab[0].table[0].rows.length &&
          s >= 0
        ) {
          if (
            this.fndlFormatedFilteredData.tab[0].table[0].rows[s].columns[m - 3]
              .rowSpan == 0
          ) {
            s--;
          } else {
            let rows = this.fndlFormatedFilteredData.tab[0].table[0].rows[s];
            for (let f = 0; f < rows.columns.length; f++) {
              let imd = m - 1;
              if (imd - 2 <= f && f < imd) {
                rows.columns[f].rowSpan = rows.columns[f].rowSpan + 1;
              }
            }
            this.updateRow(s, m - 2);
            break;
          }
        }
      }
    }
  }

  addRow(i, j) {
    let rows = this.fndlFormatedFilteredData.tab[0].table[0].rows[i];
    if (j <= 1) {
      let rowData = _.cloneDeep(rows);
      rowData.id = uuidv4();
      rowData.columns.forEach((el: any) => {
        el.id = uuidv4();
        (el.rowSpan = 1),
          (el.colSpan = 1),
          (el.bgColor = null),
          (el.fontSize = null),
          (el.textColor = null),
          (el.title = null),
          (el.value = null);
      });
      this.fndlFormatedFilteredData.tab[0].table[0].rows.push(rowData);
    } else if (j > 1) {
      let rowData = _.cloneDeep(rows);
      rowData.id = uuidv4();
      rowData.columns.forEach((el: any, k: number) => {
        el.id = uuidv4();
        if (k < j - 1) {
          (el.rowSpan = 0),
            (el.colSpan = 0),
            (el.bgColor = null),
            (el.fontSize = null),
            (el.textColor = null),
            (el.title = null),
            (el.value = null);
        }
        if (k >= j - 1) {
          (el.rowSpan = 1),
            (el.colSpan = 1),
            (el.bgColor = null),
            (el.fontSize = null),
            (el.value = null),
            (el.textColor = null),
            (el.title = null);
        }
      });
      this.fndlFormatedFilteredData.tab[0].table[0].rows.splice(
        i + 1,
        0,
        rowData
      );
      console.log('rowData.columns', rowData.columns);
      console.log(
        'this.fndlFormatedFilteredData.tab[0].table[0].rows',
        _.cloneDeep(this.fndlFormatedFilteredData.tab[0].table[0].rows)
      );
    }
  }

  getColTypeDropDown(res) {
    return [];
  }

  ngOnInit() {
    this.fndlFormatedFilteredData = {
      tab: [
        {
          id: 'afb8d3c1-8d17-48b5-8808-3209fe8cf066',
          title: ' Forecasted Transaction Generation',
          visible: true,
          fieldType: null,
          alias: null,
          container: [],
          table: [
            {
              id: '4ce4b080-6618-412f-819b-995221129ebc',
              refId: 'afb8d3c1-8d17-48b5-8808-3209fe8cf066',
              title: 'Header',
              visible: true,
              rows: [
                {
                  columns: [
                    {
                      id: 'f09d067d-5789-4194-bcd2-c68e03c8d3a2',
                      title: 'Currency Distribution',
                      value: null,
                      colType: 'label',
                      colSpan: 2,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '5bb472cf-ccf4-44be-bbf8-7617fd947090',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'fbaadf97-fcaa-41a4-b38a-e658ce65f034',
                      title: 'Product Distribution',
                      value: null,
                      colType: 'label',
                      colSpan: 2,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '8bee9b53-a712-478a-87a7-a4899bac9dc2',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'b72dc01b-d3fe-4a3b-957e-225e480cf542',
                      title: 'Tenor Distribution',
                      value: null,
                      colType: 'label',
                      colSpan: 2,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '44a91dd5-c48b-49a2-835d-100e1561a96e',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '69bf9f9c-1fb2-4421-aeba-20d34739dc90',
                      title: 'Installment Type Distribution',
                      value: null,
                      colType: 'label',
                      colSpan: 2,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '4127a2c3-2729-438a-8814-dc12880abd39',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '3f5fd5ac-a54b-41a5-af67-83507660a9f3',
                      title: 'Installment Frequency Distribution',
                      value: null,
                      colType: 'label',
                      colSpan: 3,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'c23c75cc-9fc4-48a8-be58-fdeb67e5d3fc',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '1cda36ea-2cca-4a11-b72b-718c101ccbb6',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '3f798781-7694-4678-a7de-1c4cf556b0b4',
                      title: 'Entity Distribution',
                      value: null,
                      colType: 'label',
                      colSpan: 2,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '6893e91e-033a-49b1-98f0-71e1ca4f7067',
                      title: null,
                      value: null,
                      colType: null,
                      colSpan: 0,
                      rowSpan: 0,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                  ],
                  id: '712ed48a-7671-4364-8ca7-07699938f871',
                  property: null,
                },
                {
                  columns: [
                    {
                      id: 'c7d6f7e9-3c15-469b-9304-8323e0355369',
                      title: 'Currency',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '584a3ded-fc84-4747-a611-28df49057aad',
                      title: 'Distribution (%)',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '9478f4d8-bea9-45f5-985f-31fb20db8e16',
                      title: 'Product',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '715ec16d-d465-4275-befb-8638365d20a4',
                      title: 'Distribution (%)',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '7923b14a-d4dc-4756-9a95-2dd998fdf8a1',
                      title: 'Tenor',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'bf9962e8-f335-4610-84aa-4499f9a6d504',
                      title: 'Distribution (%)',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'e8787a36-88ee-4afa-937f-50a5c7c9304a',
                      title: 'Installment Type',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'fc025fce-6197-4ae8-8f29-9a73f445bee7',
                      title: 'Distribution (%)',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '5b9e6883-c218-4d83-92cd-2e2ee9f13d65',
                      title: 'Installment Frequency',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '06356a98-b41f-4a34-9928-2dbcdd91ed09',
                      title: 'Frequency of Payment',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '32dae86f-d100-4d0a-89d7-aa1ad50bfb53',
                      title: 'Distribution (%)',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'b0f8bfb1-3213-4005-a44e-06f9343634ca',
                      title: 'Entity',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '21db0f2b-3262-4f5e-8b61-f7d1963b8027',
                      title: 'Distribution (%)',
                      value: null,
                      colType: 'label',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                  ],
                  id: '149f8a5e-cefa-4fee-820e-6e20273fc19a',
                  property: null,
                },
                {
                  columns: [
                    {
                      id: 'a3f973e0-1e9d-48be-a2b1-a8143913be8e',
                      title: null,
                      value: null,
                      colType: 'currency',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: true,
                      fontSize: null,
                    },
                    {
                      id: '32bc84be-55a0-4157-9a30-f1e87226e2c9',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '220f1e7d-0420-4567-8302-b4444538fcf6',
                      title: null,
                      value: null,
                      colType: 'product',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'fbf27f28-8482-45e4-8e36-3f0afb3cfd57',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'c08cc6a3-8d67-488c-88ad-df9b712fec93',
                      title: null,
                      value: null,
                      colType: 'tenor',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '81874df6-69f4-42c1-bc4c-b4eb4ccbd74b',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '1b2eb9fd-1a91-4e14-a4d3-f8855a3e5103',
                      title: null,
                      value: null,
                      colType: 'installmentType',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'f0e4e1cb-3842-4adf-af5f-569d6d24ba94',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'ea5365a0-6d8a-47e8-a15a-6d1d0917b411',
                      title: null,
                      value: null,
                      colType: 'installmentFrequency',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '10c0ca8d-44c7-4f57-a2bd-a134f532bc24',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '190218b9-bac0-4e95-b06e-d2d2a4ef6f00',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: 'bab667a5-d54b-4d18-ab51-6aa211fece86',
                      title: null,
                      value: null,
                      colType: 'entity',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                    {
                      id: '04700e70-07c4-4c40-b72e-b94da96241dc',
                      title: null,
                      value: null,
                      colType: 'input',
                      colSpan: 1,
                      rowSpan: 1,
                      textColor: null,
                      bgColor: null,
                      checked: false,
                      fontSize: null,
                    },
                  ],
                  id: '12794122-5b38-4404-a2ef-bbffdc77d360',
                  property: null,
                },
              ],
              template: null,
              noOfColumn: 0,
              noOfRow: 0,
              score: false,
              factor: false,
              total: false,
              alias: null,
              rowComponent: [],
            },
          ],
        },
      ],
    };
  }

  // checked = true;
  // merge: boolean;
  // mergeList = [];
  // merged: any = [];
  // validMerge: boolean;
  // cols: any = [];
  // colLength: any;
  // isLoad: boolean = false;
  // indexList: any = [];
  // localTableArray: any = [];
  // clickedCellIndex: any = [];
  // isAdd: boolean = false;

  // constructor(
  //   private formbuilder: FormBuilder,
  //   private cdr: ChangeDetectorRef
  // ) {}

  // ngOnInit() {
  //   this.merge = false;
  //   this.validMerge = false;
  // }

  // public componentForm = this.formbuilder.group({
  //   id: uuidv4(),
  //   row: [],
  //   column: [],
  //   rows: this.formbuilder.array([]),
  // });

  // public labelType = {
  //   label: 'Label Title',
  //   dropDown: 'Dropdown Type',
  //   input: 'Input Type',
  // };

  // ngAfterContentChecked() {
  //   this.cdr.detectChanges();
  // }

  // getCellDetail(compType, index) {
  //   compType.value.checked = !compType.value.checked;
  //   if (compType.value.checked) {
  //     this.clickedCellIndex.push(index);
  //     this.localTableArray.push(compType.value);
  //   } else {
  //     this.localTableArray.splice(
  //       this.localTableArray.findIndex((el: any) => {
  //         return el.id == compType.value.id;
  //       }),
  //       1
  //     );
  //   }
  // }

  // mergeData() {
  //   if (this.getMergeValidation()) {
  //     let ind: number;
  //     let found: any = {};
  //     const sumWithInitial = this.localTableArray.reduce(
  //       (accumulator, currentValue) => accumulator + currentValue.colspan,
  //       0
  //     );
  //     this.localTableArray.map((element: any) => {
  //       if (Object.keys(found).length == 0) {
  //         this.componentForm.value.rows.map((elem: any, i: number) => {
  //           if (Object.keys(found).length == 0) {
  //             found = elem.columns.find((el: any, j: number) => {
  //               ind = j;
  //               return el.id == element.id;
  //             });
  //             if (found == undefined) {
  //               found = {};
  //             }
  //             if (this.isValidInput(found) && Object.keys(found).length !== 0) {
  //               const control: any = (<FormArray>(
  //                 this.componentForm.controls['rows']
  //               ))
  //                 .at(i)
  //                 .get('columns') as FormArray;
  //               found.colspan = sumWithInitial;
  //               elem.columns.splice(ind + 1, this.localTableArray.length - 1);
  //               control.controls.splice(
  //                 ind + 1,
  //                 this.localTableArray.length - 1
  //               );
  //               this.resetTable();
  //             }
  //           }
  //         });
  //       }
  //     });
  //   }
  //   console.log('this.componentForm.value.rows', this.componentForm.value.rows);
  // }

  // getMergeValidation() {
  //   console.log('this.clickedCellIndex', this.clickedCellIndex);
  //   const everyVal = this.clickedCellIndex.every((el: any) => {
  //     return el == this.clickedCellIndex[0];
  //   });
  //   if (!everyVal) {
  //     this.resetTable();
  //     alert('cannot merge across cell');
  //     return false;
  //   } else {
  //     let status = this.getConsecutiveStatus();
  //     return status;
  //   }
  // }

  // getConsecutiveStatus() {
  //   let consecutiveIndex: any = [];
  //   this.localTableArray.forEach((e: any) => {
  //     let ind = this.componentForm.value.rows[
  //       this.clickedCellIndex[0]
  //     ].columns.findIndex((el: any) => {
  //       return el.id == e.id;
  //     });
  //     consecutiveIndex.push(ind);
  //     if (consecutiveIndex.length == this.localTableArray.length) {
  //       consecutiveIndex.sort();
  //       this.getForStatus(consecutiveIndex);
  //     }
  //   });
  //   console.log('aaaaaayyyyyyyyyyaaaaaaaa')
  //   return true;
  // }

  // getForStatus(consecutiveIndex) {
  //   let flag = false;
  //   for (let i = 1; i < consecutiveIndex.length; i++) {
  //     if (consecutiveIndex[i] != consecutiveIndex[i - 1] + 1) {
  //       this.resetTable();
  //       alert('merge elements are not consecutive');
  //       return flag;
  //     }
  //   }
  //   flag = true;
  //   return flag;
  // }

  // resetTable() {
  //   this.componentForm.value.rows.map((elem: any, i: number) => {
  //     const control: any = (<FormArray>this.componentForm.controls['rows'])
  //       .at(i)
  //       .get('columns') as FormArray;
  //     control.controls.forEach((el: any) => {
  //       el.value.checked = false;
  //     });
  //   });
  //   this.localTableArray = [];
  //   this.clickedCellIndex = [];
  // }

  // getRowProperty(e, i, type) {
  //   if (type == 'bgColor' || type == 'textColor') {
  //     let colorArr: any = [];
  //     colorArr.push(e.value);
  //     this.setRowProperty(type, i, colorArr);
  //   } else {
  //     this.setRowProperty(type, i, e.value);
  //   }
  // }

  // setRowProperty(type, index, arr) {
  //   let lastColor: any;
  //   if (type == 'bgColor' || type == 'textColor') {
  //     lastColor = arr.slice(-1).pop();
  //   }
  //   switch (type) {
  //     case 'bgColor':
  //       this.componentForm.value.rows[index]['columns'].forEach((el: any) => {
  //         el[type] = lastColor;
  //       });
  //       break;
  //     case 'textColor':
  //       this.componentForm.value.rows[index]['columns'].forEach((el: any) => {
  //         el[type] = lastColor;
  //       });
  //       break;
  //     case 'colType':
  //       const control = (<FormArray>this.componentForm.controls['rows'])
  //         .at(index)
  //         .get('columns') as FormArray;
  //       control.controls.forEach((el: any, i: any) => {
  //         el.controls[type].value = arr;
  //         el.value[type] = arr;
  //       });
  //       break;
  //     case 'fontSize':
  //       this.componentForm.value.rows[index]['columns'].forEach((el: any) => {
  //         el[type] = arr;
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // addMoreRows() {
  //   this.componentForm.value.rows.length = this.componentForm.value.rows
  //     .length++;
  //   this.tableRowControls.push(this.createRow());
  //   for (var j = 0; j < this.componentForm.value.column; j++) {
  //     const control = (<FormArray>this.componentForm.controls['rows'])
  //       .at(this.componentForm.value.rows.length - 1)
  //       .get('columns') as FormArray;
  //     control.push(this.createColumn());
  //   }
  // }

  // public get tableRowControls() {
  //   return this.componentForm.get('rows') as FormArray;
  // }

  // createTable() {
  //   for (var i = 0; i < this.componentForm.value.row; i++) {
  //     this.tableRowControls.push(this.createRow());
  //     for (var j = 0; j < this.componentForm.value.column; j++) {
  //       const control = (<FormArray>this.componentForm.controls['rows'])
  //         .at(i)
  //         .get('columns') as FormArray;
  //       control.push(this.createColumn());
  //     }
  //   }
  //   this.isAdd = true;
  // }

  // createRow(): FormGroup {
  //   return this.formbuilder.group({
  //     id: uuidv4(),
  //     property: [],
  //     columns: this.formbuilder.array([]),
  //   });
  // }

  // createColumn(): FormGroup {
  //   return this.formbuilder.group({
  //     id: uuidv4(),
  //     title: [],
  //     value: [],
  //     colType: [],
  //     colspan: [1],
  //     textColor: [],
  //     bgColor: [],
  //     checked: [],
  //     fontSize: [],
  //   });
  // }

  // postData() {
  //   console.log(this.componentForm);
  //   //isme jo json generate hua wo backend me uska table banega
  //   // title: [],
  //   //   value: [],
  //   //   colType: [],
  //   //   colspan: [1],
  //   //   textColor: [],
  //   //   bgColor: [],
  //   //   checked: [],
  //   //   fontSize: [],
  //   //DOUBLE CLICK KRKE JO PROPERTY BNAYA WO UPAR KE VALUE,COLTYPE ME JAYEGA PHIR WAHI DATABASE ME SAVE HOGA
  // }

  // getColumnCount() {
  //   if (this.componentForm.value.row) {
  //     this.componentForm.get('rows')['controls'] = [];
  //     this.createTable();
  //   }
  // }

  // getRowCount() {
  //   if (this.componentForm.value.column) {
  //     this.componentForm.get('rows')['controls'] = [];
  //     this.createTable();
  //   }
  // }

  // products: any = [
  //   { name: 'Label', value: 'label' },
  //   { name: 'Dropdown', value: 'dropDown' },
  //   { name: 'Input', value: 'input' },
  // ];

  // fontSize: any = [
  //   { name: '14px', value: '14px' },
  //   { name: '16px', value: '16px' },
  //   { name: '18px', value: '18px' },
  // ];

  // isValidInput(input) {
  //   if (this.isNull(input) || this.isUndefined(input) || this.isEmpty(input)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // isUndefined(input) {
  //   if (typeof input === 'undefined') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // isNull(input) {
  //   if (input != null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // isEmpty(input) {
  //   if (typeof input === 'undefined') {
  //     return true;
  //   } else {
  //     let lstrTempstring = String(input);
  //     lstrTempstring = lstrTempstring.trim();
  //     if (lstrTempstring === '' || lstrTempstring === 'undefined') {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }

  // //subham code
  // // mergeColumns() {
  // //   if (this.validateMerge()) {
  // //     let mergeIndex = Number(Math.min(...this.indexList));
  // //     this.selectedCells.forEach((data: any) => {
  // //       this.tableRowControls['controls'].forEach((rowControl) => {
  // //         rowControl
  // //           .get('columns')
  // //           ['controls'].forEach((columnControl: any, i: any) => {
  // //             if (_.isEqual(columnControl.value, data)) {
  // //               if (mergeIndex != i) {
  // //                 _.remove(
  // //                   rowControl.get('columns')['controls'],
  // //                   (element: any) => _.isEqual(element.value, data)
  // //                 );
  // //                 _.remove(rowControl.get('columns')['value'], (element: any) =>
  // //                   _.isEqual(element, data)
  // //                 );
  // //               } else {
  // //                 this.setColSpan(columnControl, this.selectedCells);
  // //               }
  // //             }
  // //           });
  // //       });
  // //     });
  // //     this.selectedCells = [];
  // //     this.indexList = [];
  // //   } else {
  // //     this.indexList = [];
  // //     this.selectedCells.forEach((cell: any) => {
  // //       cell.checked = false;
  // //     });
  // //     this.selectedCells = [];
  // //     return;
  // //   }
  // // }

  // // setColSpan(cell, length) {
  // //   let sumWithInitial = this.selectedCells.reduce(
  // //     (accumulator, currentValue) => accumulator + currentValue.colspan,
  // //     0
  // //   );
  // //   if (cell.controls.colspan.value) {
  // //     cell.controls.colspan.value = sumWithInitial;
  // //   }
  // //   if (cell.value) {
  // //     cell.value.colspan = sumWithInitial;
  // //     cell.value.checked = false;
  // //   }
  // // }

  // // validateMerge() {
  // //   let flag: boolean = false;
  // //   let rowFlag: boolean = false;
  // //   let adjFlag: boolean = false;
  // //   let indexArr: any = [];
  // //   let adjacentArr: any = [];
  // //   //code for across rows
  // //   this.selectedCells.forEach((cell: any) => {
  // //     this.componentForm.value.rows.forEach((row: any, index: any) => {
  // //       if (row.columns.includes(cell)) {
  // //         indexArr.push(index);
  // //       }
  // //     });
  // //   });
  // //   this.componentForm.value.rows.forEach((row: any) => {
  // //     row.columns.forEach((column: any, index: number) => {
  // //       if (this.selectedCells.includes(column)) {
  // //         adjacentArr.push(index);
  // //       }
  // //     });
  // //   });
  // //   _.uniq(indexArr).length == 1 ? (rowFlag = true) : '';
  // //   adjFlag = this.sequntialIndices(adjacentArr, adjacentArr.length);
  // //   adjFlag == true && rowFlag == true ? (flag = true) : (flag = false);
  // //   return flag;
  // // }

  // // sequntialIndices(arr: any, n: any) {
  // //   arr.sort();
  // //   for (let i = 1; i < n; i++) if (arr[i] != arr[i - 1] + 1) return false;
  // //   return true;
  // // }
}
