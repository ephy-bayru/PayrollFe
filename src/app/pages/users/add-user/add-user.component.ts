import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from '../user.service';
import { MustMatch } from '../match-validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

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
    phone: [
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
    private userService: UserService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
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
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?!(\\d)\\1+$)(?:\\(?\\+\\d{1,3}\\)?[- ]?|0)?\\d{10}$')
      ])],
      email: ['', Validators.required, Validators.email],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      address: '',
      postcode: '',
      active: true,
      roles: 'user'
    },
    {
      validator: MustMatch('password', 'confirm')
    });
  }

  get f() { return this.userForm.controls; }
  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get email() {
    return this.userForm.get('email');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get active() {
    return this.userForm.get('active');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirm() {
    return this.userForm.get('confirm');
  }
  get address() {
    return this.userForm.get('address');
  }
  get postcode() {
    return this.userForm.get('postcode');
  }

  registerUser() {
    this.submitted = true;
    // if (this.userForm.valid) {
      const userParam = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        phone: this.userForm.value.phone,
        email: this.userForm.value.email,
        gender: this.userForm.value.gender,
        active: true,
        password: this.userForm.value.password,
        address: this.userForm.value.address,
        postcode: this.userForm.value.address,
        roles: [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa8",
            "name": "user"
          }
        ],
      };
      console.log(userParam);
      this.userService.createUser(userParam).subscribe(
        result => {
            this.bsModalRef.hide();
            this.notificationService.info('successfully created an user', 'success')
        }
      );
    // }
  }
}
