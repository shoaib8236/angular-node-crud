import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from './../../app-ui/add-users/add-users.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'app_screen_layout' },
})
export class HomeComponent {
  constructor(private _apiData: UsersService, private dialog: MatDialog) {}

  users = [];
  userIds = Array();
  usersSuccess = false;

  onChecked(event: any) {
    if (event.checked) {
      this.userIds.push(event.source.value);
    } else {
      this.userIds.filter((item) => {
        let index = this.userIds.indexOf(event.source.value);
        if (index !== -1) this.userIds.splice(index, 1);
      });
    }
  }

  onAddUser() {
    const dialogRef = this.dialog.open(AddUsersComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.length > 0) {
        this.users = result;
      }
    });
  }

  onDeleteUser() {
    this._apiData.deleteUsers(this.userIds).subscribe((res: any) => {
      this.users = res?.data;
      this.userIds = [];
    });
  }

  onUpdate(data: any) {
    if (data.length > 0) {
      this.users = data;
    }
  }

  async getAllUsers() {
    this.usersSuccess = false;
    this._apiData.getUsers().subscribe((res: any) => {
      this.users = res?.data;
      this.usersSuccess = true;
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }
}
