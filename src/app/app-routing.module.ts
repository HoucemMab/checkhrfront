import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { RequestLoanComponent } from './request-loan/request-loan.component';
import { TrainingComponent } from './training/training.component';
import { RequestTrainingComponent } from './request-training/request-training.component';
import { EventsComponent } from './events/events.component';
import { NoteComponent } from './note/note.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { RoleGuard } from './role.guard';
import { AuthorizedPageComponent } from './authorized-page/authorized-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/note', pathMatch: 'full' }, // Redirect empty path to '/profile'

  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
    canActivate: [AuthGuard], // Add the AuthGuard to canActivate
  },
  {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar',
    canActivate: [AuthGuard], // Add the AuthGuard to canActivate
  },
  {
    path: 'employeprofile',
    component: EmployeeProfileComponent,
  },
  {
    path: 'requestloan',
    component: RequestLoanComponent,
  },
  {
    path: 'trainings',
    component: TrainingComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'request-training',
    component: RequestTrainingComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'note',
    component: NoteComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'addEmployee',
    component: AddEmployeeComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'leaves',
    component: LeavesComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'loans',
    component: LoanComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'traininglist',
    component: TrainginsListComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'request-leave',
    component: RequestLeaveComponent,
  },
  {
    path: 'admin-event',
    component: AdminEventsComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN'] }, // Use quotes
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },
  {
    path: 'documents/:userId',
    component: DocumentByIdComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ADMIN', 'CHIEF'] }, // Use quotes
  },

  {
    path: 'authorized',
    component: AuthorizedPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
