import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersFormComponent } from '../users-form/users-form.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  constructor(private dialog: MatDialog) {}

  @Input() data = {
    _id: <string>'',
    image: <string>'',
    name: <string>'',
    company: <string>'',
  };

  @Output() userObj = new EventEmitter<any>();
  @Output() updateUsers = new EventEmitter<any>();

  openDialog(data: object): void {
    const dialogRef = this.dialog.open(UsersFormComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateUsers.emit(result);
    });
  }

  onGetId(e: any) {
    this.userObj.emit(e);
  }
}
