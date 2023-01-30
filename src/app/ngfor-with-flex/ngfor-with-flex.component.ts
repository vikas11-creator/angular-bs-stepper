import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngfor-with-flex',
  templateUrl: './ngfor-with-flex.component.html',
  styleUrls: ['./ngfor-with-flex.component.css']
})
export class NgforWithFlexComponent implements OnInit {

  editWorkflowValue: any = [];
  constructor() { }

  ngOnInit() {
    this.editWorkflowValue = [
      {
        'entityType': 'Name',
        'name': [{ 'name': 'Rohit' }, { 'name': 'Sukanya' }],
        'turnTime': '28 Days',
        'action': 'Auto-Reject'
      },
      {
        'entityType': 'Name',
        'name': [{ 'name': 'Rohit' }, { 'name': 'Sukanya' }],
        'turnTime': '28 Days',
        'action': 'Auto-Reject'
      }
    ]
  }

}