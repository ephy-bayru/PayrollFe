import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { EmployeeComponent } from 'src/app/pages/employees/employee/employee.component';
import { UsersListComponent } from 'src/app/pages/users/users-list/users-list.component';
import { DepartmentsComponent } from 'src/app/pages/departments/departments/departments.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'users', component: UsersListComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: 'departments', component: DepartmentsComponent }
];
