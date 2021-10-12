import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { EmployeeComponent } from './pages/employees/employee/employee.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { DepartmentsComponent } from './pages/departments/departments/departments.component';
import { AddDepartmentComponent } from './pages/departments/add-department/add-department.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    ModalModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    UsersListComponent,
    AddUserComponent,
    EditUserComponent,
    DepartmentsComponent,
    AddDepartmentComponent,
    UserProfileComponent,
    LoginComponent,
    //DashboardComponent
  ],
  providers: [BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
