import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/Core/Services/staff.service';

@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html',
  styleUrls: ['./health-record.component.scss']
})
export class HealthRecordComponent implements OnInit {

  records: any[] = []
  mappedData: any[] = []
  lastRecord!: any
  show: boolean = false
  constructor(
    private _StaffService: StaffService
  ) { }
  chartOptions = {
    title: {
      text: "Heart Sensor 'MAX30100'"
    },
    animationDuration: 2000,
    data: [{
      type: "splineArea",
      color: '#2662F0',
      dataPoints: [
        { label: "Apple", y: 10 },
        { label: "Orange", y: 15 },
        { label: "Banana", y: 25 },
        { label: "Mango", y: 30 },
        { label: "Grape", y: 28 }
      ]
    }]
  };


  getAllHealthRecord() {
    this._StaffService.getAllHealthRecords().subscribe({
      next: response => {
        this.records = response
        this.mappedData = this.records.map(item => ({
          label: item.time.toString(),
          y: Number.parseInt(item.heart_rate)
        }))
        console.log('1: ',this.mappedData.slice(-10));

        this.chartOptions.data[0].dataPoints = this.mappedData.slice(-10);
        this.show = true
        console.log(this.chartOptions.data[0].dataPoints);

      },
      error: error => {
        console.log(error);
      }
    })
  }

  getLastRecord() {
    this._StaffService.getLastHealthRecord().subscribe({
      next: response => {
        console.log(response);
        this.lastRecord = response

      },
      error: error => {
        console.log(error);

      }
    })
  }

  ngOnInit(): void {
    this.getLastRecord()
    this.getAllHealthRecord()
  }
}
