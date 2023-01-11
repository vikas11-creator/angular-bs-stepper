import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-loop',
  templateUrl: './accordion-loop.component.html',
  styleUrls: ['./accordion-loop.component.css'],
})
export class AccordionLoopComponent implements OnInit {
  accor: any;
  constructor() {}

  ngOnInit() {
    this.accor = [
      { name: 'all', checked: false, val: 'djshbjbdcbadcbadkjbkasbk' },
      { name: 'view', checked: false, val: 'djshbjbdcbadcbadkjbkasbk' },
      { name: 'edit', checked: false, val: 'djshbjbdcbadcbadkjbkasbk' },
      { name: 'delete', checked: false, val: 'djshbjbdcbadcbadkjbkasbk' },
    ];
  }
}
