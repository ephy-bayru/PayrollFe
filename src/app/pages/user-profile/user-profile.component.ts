import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Employee, TimeSheet } from 'src/app/interface/employee';
import { Payroll } from 'src/app/interface/payroll';
import { NotificationService } from 'src/app/service/notification.service';
import { EmployeeService } from '../employees/employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
employee: Employee;
employeeForm: FormGroup;
timeSheetForm: FormGroup;
payroll: Payroll;
timesheet: TimeSheet[];

tax;
gross;
net;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private notificationService: NotificationService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation == null) {
      this.router.navigate(['/employees'])
    }
    const state = navigation.extras.state as {employee: Employee};
    this.employee = state.employee;
    if (this.employee == null) {
      this.router.navigate(['/employees'])
    }
    this.employeeService.calculatePayroll(this.employee.id).subscribe(
      result => {
        this.payroll = result;
        console.log(result)
      }
    );
  }
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      phoneNumber: this.employee.phoneNumber,
      email: this.employee.email,
      gender: this.employee.gender,
      departmentId: this.employee.departmentId,
      grossSalary: this.employee.grossSalary,
      position: this.employee.position,
      status: this.employee.status
    });

    this.timeSheetForm = this.formBuilder.group({
      hours: 0,
      date: null,
      employeeId: '',
    });

    this.getEmployee(this.employee.id)
  }

  get f() { return this.employeeForm.controls; }
  get firstName() {
    return this.employeeForm.get('firstName');
  }
  get lastName() {
    return this.employeeForm.get('lastName');
  }
  get phoneNumber() {
    return this.employeeForm.get('phoneNumber');
  }
  get email() {
    return this.employeeForm.get('email');
  }
  get gender() {
    return this.employeeForm.get('gender');
  }
  get departmentId() {
    return this.employeeForm.get('departmentId');
  }
  get grossSalary() {
    return this.employeeForm.get('grossSalary');
  }
  get position() {
    return this.employeeForm.get('position');
  }
  get status() {
    return this.employeeForm.get('status');
  }
  get hours() {
    return this.timeSheetForm.get('status');
  }
  get date() {
    return this.timeSheetForm.get('date');
  }
  get employeeId() {
    return this.timeSheetForm.get('employeeId');
  }

  getEmployee(id: any) {
    this.employeeService.getEmployee(id).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  registerTime() {
    const param: TimeSheet = {
      hours: this.timeSheetForm.value.hours,
      Date: this.timeSheetForm.value.date,
      employeeId: this.employee.id
    }
    this.employeeService.addTimesheet(param).subscribe(
      result => {
          this.notificationService.info('successfully added timesheet', 'success')
          this.timesheet = result?.result?.employeeTimeSheet;
          this.gross = result?.result?.gross;
          this.net = result?.result?.netSalary;
          this.tax = result?.result?.taxRate;
      }
    );
  }
}
