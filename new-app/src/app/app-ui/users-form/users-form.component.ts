import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})

export class UsersFormComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { _id: string; name: string; company: string },
    private fb: FormBuilder,
    private _apiData: UsersService,
    public dialogRef: MatDialogRef<UsersFormComponent>
  ) {}

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
  });

  createForm() {
    this.myForm = this.fb.group({
      name: [this.data.name, Validators.required],
      company: [this.data.company, Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(payload: object) {
    if (this.myForm.valid) {
      this._apiData.updateUser(payload, this.data._id).subscribe((res: any) => {
        this.dialogRef.close(res.data);
      });
    }
  }
}
