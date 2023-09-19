import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { FormsModule } from '@angular/forms';
import { MeetingComponent } from './meeting/meeting.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RequestLoanComponent } from './request-loan/request-loan.component';
import { TrainingComponent } from './training/training.component';
import { RequestTrainingComponent } from './request-training/request-training.component';
import { EventsComponent } from './events/events.component';
import { NoteComponent } from './note/note.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentsComponent } from './documents/documents.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LeavesComponent } from './leaves/leaves.component';
import { LoanComponent } from './loan/loan.component';
import { TrainginsListComponent } from './traingins-list/traingins-list.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DocumentByIdComponent } from './document-by-id/document-by-id.component';
import { EventwebsocketService } from './service/eventwebsocket.service';
import { AuthorizedPageComponent } from './authorized-page/authorized-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    EmployeeProfileComponent,
    MeetingComponent,
    RequestLoanComponent,
    TrainingComponent,
    RequestTrainingComponent,
    EventsComponent,
    NoteComponent,
    LoginComponent,
    DashboardComponent,
    DocumentsComponent,
    AddEmployeeComponent,
    LeavesComponent,
    LoanComponent,
    TrainginsListComponent,
    RequestLeaveComponent,
    AdminEventsComponent,
    EmployeesComponent,
    EmployeeListComponent,
    DocumentByIdComponent,
    AuthorizedPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
    NoopAnimationsModule,
  ],
  providers: [EventwebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
