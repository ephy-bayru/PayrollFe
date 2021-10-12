import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Department } from 'src/app/interface/department';
import { NotificationService } from 'src/app/service/notification.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentsList: Department[];
  department: Department;
  itemsPerPage = 6;
  totalItems = 0;
  currentPage = 1;
  fetchCustomers = false;
  reverse = false;
  sortedList: any[];

  constructor(
    private departmentService: DepartmentService,
    private modalService: BsModalService,
    private notificationService: NotificationService
    ) {
  }

  ngOnInit() {
    this.listDepartments();
  }

  listDepartments() {
    this.departmentService.getDepartments().subscribe(
      department => {
        if (department) {
          console.log(department)
          this.departmentsList = department;
          this.notificationService.info('successfully fetched departments', 'success')
        }
      }
    );
  }

  registerDepartment() {
    this.modalService.show(AddDepartmentComponent);
    this.modalService.onHide.subscribe(result => {
      this.listDepartments();
    });
  }

  deleteDepartment(id) {
    console.log(id)
    this.departmentService.deleteDepartment(id).subscribe(
      res => {
        this.listDepartments()
        this.notificationService.success('successfully deactivated department', 'success')
    })
  }

  search() {
    //
  }
}
