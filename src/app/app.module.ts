import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedService } from './shared.service';

import { DataTablesModule } from 'angular-datatables';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {TruncatePipe } from 'src/app/truncate.pipe'
import { MatSelectModule } from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import {MatStepperModule} from '@angular/material/stepper';

import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { ReportComponent } from './report/report.component'; // Import your custom strategy
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { IntialcoatingComponent } from './intialcoating/intialcoating.component';
import { FinalcoatingComponent } from './finalcoating/finalcoating.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReportComponent,
    IntialcoatingComponent,
    FinalcoatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatTooltipModule,
    DataTablesModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
  ],
  providers: [
    [SharedService],
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
