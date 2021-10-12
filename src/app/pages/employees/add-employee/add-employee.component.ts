import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../../interface/employee';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  departmentsList: any[];

  vMsg = {
    firstName: [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'First Name must be at least 3 characters long' },
      { type: 'maxlength', message: 'First Name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your First Name must contain only letters' }
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required' },
      { type: 'minlength', message: 'Last Name must be at least 3 characters long' },
      { type: 'maxlength', message: 'Last Name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your Last Name must contain only letters' }
    ],
    phoneNumber: [
      { type: 'required', message: 'phone number is required' },
      { type: 'pattern', message: 'insert a valid phone number' }
    ],
    email: [
      { type: 'required', message: 'email is required' },
      { type: 'pattern', message: 'insert a valid email address' }
    ]
  };

  genders: any[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  ];
  stat: any[] = [
    {value: true, viewValue: 'Active'},
    {value: false, viewValue: 'Disabled'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private employeeService: EmployeeService,
    private _route: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.required
      ])],
      phoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?!(\\d)\\1+$)(?:\\(?\\+\\d{1,3}\\)?[- ]?|0)?\\d{10}$')
      ])],
      email: ['', Validators.required, Validators.email],
      gender: ['', Validators.required],
      departmentId: '',
      grossSalary: '',
      position: '',
      status: true
    });
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

  registerEmployee() {
    this.submitted = true;
    // if (this.employeeForm.valid) {
      const param: Employee = {
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        phoneNumber: this.employeeForm.value.phoneNumber,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        departmentId: '7fc29868-8bab-4bab-b550-f91b75e92e3b',
        grossSalary: this.employeeForm.value.grossSalary,
        position: this.employeeForm.value.position,
        status: this.employeeForm.value.status,
      };
      console.log(param);
      this.employeeService.createEmployee(param).subscribe(
        result => {
            this.bsModalRef.hide();
            this.notificationService.info('successfully created an employee', 'success')
        }
      );
    // }
  }

}
