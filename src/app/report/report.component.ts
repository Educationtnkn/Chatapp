import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit, OnDestroy, Renderer2, QueryList, ViewChildren } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare var $: any;
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
// import 'datatables.net-buttons/js/buttons.flash.min';
// import 'datatables.net-buttons/js/buttons.html5.min';
import { DataTableDirective } from 'angular-datatables';
import { MatSelect } from '@angular/material/select';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { saveAs } from 'file-saver';



interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ReportComponent implements OnInit {


  messages: Message[] = [];
  currentMessage = '';

  constructor(private http: HttpClient, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    $('#action_menu_btn').click(function () {
      $('.action_menu').toggle();
    });
    // Load chat history from the JSON file
    this.http.get<Message[]>('/assets/chat.json').subscribe(
      data => {
        this.messages = data;
      },
      error => {
        console.error('Error loading chat history:', error);
      }
    );

  }

  TxtMsg: string = '';

  sendMessage(): void {
    if (this.TxtMsg.trim() !== '') {
      const sender = 'You'; // Replace with dynamic username logic if needed
      const timestamp = this.getCurrentTimestamp();
      const newMessage: Message = { sender, content: this.TxtMsg, timestamp };

      // Display the message
      this.messages.push(newMessage);


      //Save the message to notepad (JSON file)
      this.http.put('/assets/chat.json', this.messages).subscribe(
        () => {
          console.log('Message saved successfully');
        },
        error => {
          console.error('Error saving message:', error);
        }
      );

     // this.writeJsonData(this.messages).subscribe();


      this.scrollToBottom();

      // Clear the input field
      this.currentMessage = '';
    }
  }

  private getCurrentTimestamp(): string {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedDate;
  }


  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  // writeJsonData(data: any): Observable<any> {
  //   return this.http.post('/assets/chat.json', data);
  // }




}
