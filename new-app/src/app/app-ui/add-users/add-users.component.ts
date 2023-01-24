import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { _id: string; name: string; company: string },
    private fb: FormBuilder,
    private _apiData: UsersService,
    public dialogRef: MatDialogRef<AddUsersComponent>
  ) {}

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
  });

  onSubmit(payload: object) {
    if (this.myForm.valid) {
      this._apiData.addUser(payload).subscribe((res: any) => {
        this.dialogRef.close(res.data);
      });
    }
  }
}
