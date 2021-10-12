import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/service/notification.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  submitted = false;

  vMsg = {
    name: [
      { type: 'required', message: 'Department Name is required' }
    ],
    abrevation: [
      { type: 'required', message: 'Abbreviation is required' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private dptService: DepartmentService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      abrevation: ['', Validators.required],
      status: true
    });
  }

  get name() {
    return this.departmentForm.get('name');
  }
  get abrevation() {
    return this.departmentForm.get('abrevation');
  }
  get status() {
    return this.departmentForm.get('status');
  }


  registerDepartment() {
    this.submitted = true;
      const dptParam = {
        name: this.departmentForm.value.name,
        abrevation: this.departmentForm.value.abrevation,
        status: true
      };
      console.log(dptParam);
      this.dptService.createDepartment(dptParam).subscribe(
        result => {
            this.bsModalRef.hide();
            this.notificationService.info('successfully created a department', 'success')
        }
      );
    // }
  }
}
