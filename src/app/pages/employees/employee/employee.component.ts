import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/interface/employee';
import { BsModalRef, BsModalService, } from 'ngx-bootstrap/modal';
import { EmployeeService } from '../employee.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { NotificationService } from 'src/app/service/notification.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  employeesList: Employee[];
  employee: Employee;
  startDay = new Date().toISOString().substring(0, 10);
  /// pagination
  itemsPerPage = 6;
  totalItems = 0;
  currentPage = 1;
  fetchCustomers = false;
  reverse = false;
  sortedList: any[];

  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService,
    private notificationService: NotificationService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.listEmployees();
  }

  listEmployees() {
    this.employeeService.getEmployees().subscribe(
      emps => {
        if (emps) {
          console.log(emps)
          this.employeesList = emps;
          this.notificationService.info('successfully fetched employees', 'success')
        }
      }
    );
  }

  registerEmployee() {
    this.modalService.show(AddEmployeeComponent);
    this.modalService.onHide.subscribe(result => {
      this.listEmployees();
    });
  }

  updateEmployee(i: number) {
    const initialState = {
      employee: this.employeesList[i]
    };
    console.log(initialState)
    this.modalService.show(EditEmployeeComponent, {initialState});
    this.modalService.onHide.subscribe(
      res => {
        this.listEmployees();
      }
    );
  }

  employeeDetail(i: number) {
    const employee = this.employeesList[i];
    this.router.navigate(['/profile',{ state: { employee: employee }}])

    const navigationExtras: NavigationExtras = {state: {employee: employee}};
      this.router.navigate(['/profile'], navigationExtras);
  }

  deleteEmployee(id) {
    console.log(id)
    this.employeeService.deleteEmployee(id).subscribe(
      res => {
        this.listEmployees()
        this.notificationService.success('successfully deleted user', 'success')
    })
  }

  search() {
    //
  }
}
