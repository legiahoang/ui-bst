import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Role} from '../role.model';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {CreateUserComponent} from '../create-user/create-user.component';

import {MdDialog} from '@angular/material';
import {AlertDialog} from '../../dialog/alert.dialog.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [UserService]
})
export class ListUserComponent implements OnInit {

  listUsers: string[];
  user: User;
  bsModalRef: BsModalRef;
  listRole: string[];
  role: Role;
  disableInput: boolean;
	indexPage: number = 0;

  title: string;

  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private userService: UserService,
              private modalService: BsModalService,
              private dialog: MdDialog) {
    this.getAllUser();
    this.getListRole();
    this.user = this.user || new User();
  }

  ngOnInit() {

  }

  getAllUser() {
    this.userService.getUsers(this.currentPage, this.itemsPerPage).subscribe(
      response => {
        this.listUsers = response.data;
        this.totalItems = response.total;
      },
      error => {
        alert('Server error');
      }
    );
    return event;
  }

  getListRole() {
    this.userService.getRoles().subscribe(
      data => this.listRole = data,
      err => {
        console.log(err);
      });
  }

  public showModal(userId: string) {
    this.dialog.open(AlertDialog, {
      width: '400px', height: '170px', data: {
        title: 'Confirm dialog', message: 'Are you sure you want to delete this item?'
      }
    }).afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.userService.deleteUser(userId).subscribe(
          data => {
            this.getAllUser();
          }
        );
      }
    });
  }

  addNew() {
    this.openCreateModal(this.listRole);
  }

  openCreateModal(roles: string[]) {
    this.bsModalRef = this.modalService.show(CreateUserComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.title = 'Add new User';
    this.modalService.onHide.subscribe(data => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  editUser(userId: string) {
    this.title = 'Edit an User';
    this.findUserById(userId, true, this.title);
  }

  viewUser(userId: string) {
    this.title = 'View User Info';
    this.findUserById(userId, false, this.title);
  }

  findUserById(userId: string, disableInput: boolean, title: string): void {
    this.userService.findOne(userId).subscribe(
      data => {
        this.user = data;
        this.role = data.roles[0];
        this.openEditModal(this.listRole, this.user, this.role, disableInput, title);
      }
    );
  }

  openEditModal(roles: string[], user: User, role: Role, disableInput: boolean, title: string) {
    this.bsModalRef = this.modalService.show(EditUserComponent);
    this.bsModalRef.content.roleData = roles;
    this.bsModalRef.content.user = user;
    this.bsModalRef.content.role = role;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.disableInput = disableInput;
    this.modalService.onHide.subscribe(data => this.getAllUser(),
      err => {
        console.log(err);
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
		this.indexPage = this.currentPage > 1 ? (this.currentPage - 1) * this.itemsPerPage : 0;
    this.getAllUser();
  }
}

