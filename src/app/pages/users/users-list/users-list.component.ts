import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/interface/user';
import { NotificationService } from 'src/app/service/notification.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  usersList: User[];
  user: User;
  startDay = new Date().toISOString().substring(0, 10);
  /// pagination
  itemsPerPage = 6;
  totalItems = 0;
  currentPage = 1;
  fetchCustomers = false;
  reverse = false;
  sortedList: any[];

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private notificationService: NotificationService
    ) {
  }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUsers().subscribe(
      users => {
        if (users) {
          console.log(users)
          this.usersList = users;
          this.notificationService.info('successfully fetched users', 'success')
        }
      }
    );
  }

  registerUser() {
    this.modalService.show(AddUserComponent);
    this.modalService.onHide.subscribe(result => {
      this.listUsers();
    });
  }

  updateUser(i: number) {
    const initialState = {
      User: this.usersList[i]
    };
    console.log(initialState)
    this.modalService.show(EditUserComponent, {});
    this.modalService.onHide.subscribe(
      res => {
        this.listUsers();
      }
    );
  }

  deleteUser(id) {
    console.log(id)
    this.userService.deleteUser(id).subscribe(
      res => {
        this.listUsers()
        this.notificationService.success('successfully deleted user', 'success')
    })
  }

  search() {
    //
  }

}
