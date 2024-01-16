// shared.service.ts
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  
    CurrentWorkCenter = "ALL";

    ReportInput = false;
 

    WorkcenterChange: EventEmitter<string> = new EventEmitter<string>();
    ShiftChange: EventEmitter<string> = new EventEmitter<string>();
    ReportInputChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    ReportResponseChange: EventEmitter<any> = new EventEmitter<any>();

  // Function to change the value
  changeValueWorkCenter(newValue: string) {
    this.WorkcenterChange.emit(newValue);
  }

  changeReportInput(newValue: boolean) {
    this.ReportInputChange.emit(newValue);
  }

  changeValueShift(newValue: string) {
    this.ShiftChange.emit(newValue);
  }

  ChangeReportResponse(newValue: any) {
    this.ReportResponseChange.emit(newValue);
  }
}

// // file1.ts
// import { SharedService } from './shared.service';

// // Inject the service in the constructor
// constructor(private sharedService: SharedService) {}

// // Change the value
// this.sharedService.sharedValue = 'new value';

// // file2.ts
// import { SharedService } from './shared.service';

// // Inject the service in the constructor
// constructor(private sharedService: SharedService) {}

// // Access the value
// console.log(this.sharedService.sharedValue); // This will print 'new value'
