import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
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

@Component({
  selector: 'app-intialcoating',
  templateUrl: './intialcoating.component.html',
  styleUrls: ['./intialcoating.component.scss']
})
export class IntialcoatingComponent implements OnDestroy, OnInit {

 
  @ViewChild('Okbarcode') OkInput: ElementRef | undefined;

  dtElement!: DataTableDirective;
  ReportInputform: FormGroup;

  //Apiurl : string = "http://192.168.28.207:8085/";
  Apiurl: string = "http://localhost:8085/";

  RecordResponse: any

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  PrintQueue: any[] = [];

  Isdisabled: any = true;
  IsVisibleWifi: any = false;
  UpdateColumn: any;
  AllowRecordUpdate: boolean = true;
  CheckDuplicate: boolean = true;

  ICT_ICON = "remove_red_eye"
  FPT_ICON = "remove_red_eye"
  ICT_COLOR = "btn-primary"
  FPT_COLOR = "btn-primary"

  VI_ICON = "remove_red_eye"
  VI_COLOR = "btn-primary"

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      processing: true,
      //  dom: 'Bfrtip',
    };
  }

  ICTStatus = "";
  EPASS1Status = "";
  FTStatus = "";
  EPASS2Status = "";

  SerialNo = "";
  PBAModel = "";
  OverallStatus: boolean = true;
  onChangeEvent(event: KeyboardEvent): void {

    if (event.which === 13) {
      event.preventDefault();
      const inputValue = (event.target as HTMLInputElement).value.toUpperCase().trim();

      console.log(inputValue);
      this.SerialNo = inputValue;

      const updatedData = {
      }
      this.http.put(`${this.Apiurl + 'UpdateFirstCoating'}/${inputValue}`, updatedData).subscribe(
        (response) => {

          console.log('Response from Go API:', response);

          this.RecordResponse = response;

          if (this.RecordResponse.serial_no == "") {
            this.AllowRecordUpdate = false;
            this.showNotification("No Exist, Serial Number Not Available", "danger")
            this.ResetInput();
            return;
          } else {


            if (this.RecordResponse.ict_status == "OK") {

              this.ICT_COLOR = "btn-success"
              this.ICT_ICON = "check"

            } else {
              this.ICT_COLOR = "btn-danger"
              this.ICT_ICON = "cancel"

              this.OverallStatus = false
            }

            if (this.RecordResponse.ict_status == "OK") {

              this.FPT_COLOR = "btn-success"
              this.FPT_ICON = "check"
            } else {
              this.FPT_COLOR = "btn-danger"
              this.FPT_ICON = "cancel"
              this.OverallStatus = false
            }

            if (this.RecordResponse.vi_status == "OK") {

              this.VI_COLOR = "btn-success"
              this.VI_ICON = "check"
            } else {
              this.VI_COLOR = "btn-danger"
              this.VI_ICON = "cancel"
              this.OverallStatus = false
            }


            if (this.OverallStatus == true) {

              this.showNotification("VI Validation Done Successfully", "success")

            } else {
              this.showNotification("ICT / FPT / VI Failed", "danger")

            }

          }


          setTimeout(() => {
            this.ResetInput()


          }, 1000);



        })
    }
  }

  ResetInput() {
    this.ReportInputform.reset({
      Okbarcode: ''
    });

    this.OverallStatus = true
    this.ICT_ICON = "remove_red_eye"
    this.FPT_ICON = "remove_red_eye"
    this.ICT_COLOR = "btn-primary"
    this.FPT_COLOR = "btn-primary"
    this.VI_ICON = "remove_red_eye"
    this.VI_COLOR = "btn-primary"

    if (this.OkInput) {
      this.OkInput.nativeElement.focus();
    }

  }



  private setFocusOnElement(selector: string) {
    const elem = this.el.nativeElement.querySelector(selector);

    if (elem) {
      this.renderer.listen(elem, 'focus', () => {
        console.log('focus');
      });

      this.renderer.listen(elem, 'blur', () => {
        console.log('blur');
      });

      elem.focus();
    }
  }
  DongleInputValue = "0";


  FilterValue: any;

  constructor(private el: ElementRef, public http: HttpClient, private fb: FormBuilder, public renderer: Renderer2, private route: ActivatedRoute) {


    this.FilterValue = this.route.snapshot.queryParamMap.get('Line');
    console.log("DROP Value : %", this.FilterValue)



    this.ReportInputform = this.fb.group({
      Okbarcode: ['']
    });




    console.log('Constructor');

  }

  ngAfterViewInit() {
    // setTimeout(() => {

    var elem = this.renderer.selectRootElement('#Okbarcode');

    this.renderer.listen(elem, "focus", () => { console.log('focus') });

    this.renderer.listen(elem, "blur", () => { console.log('blur') });

    elem.focus();

    // }, 1000);
  }

  focusMyInput() {
    this.renderer.selectRootElement('#Okbarcode').focus();

  }


  ngOnDestroy() {
    // Unsubscribe the dtTrigger to prevent memory leaks
    this.dtTrigger.unsubscribe();
  }


  showNotification(message: any, type: any) {
    // const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: type,
      timer: 1000,

      placement: {
        from: 'top',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert" style="z-index:3010 !important">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}

