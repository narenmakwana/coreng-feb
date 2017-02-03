import {Component} from '@angular/core';
import {MdDialogRef} from '../../../../../node_modules/@angular/material/dialog/dialog-ref';

@Component({
  selector : 'c-completed-dialog',
  template : `
    <md-card>
      <md-card-title>Success</md-card-title>
      <md-card-content>
        You've successfully completed this form!
      </md-card-content>
      <md-card-actions align="end">
        <button md-raised-button color="primary" (click)="close()">Done</button>
      </md-card-actions>
    </md-card>
  `,
  styles : []
})
export class CompletedDialogComponent {

  constructor(public dialogRef: MdDialogRef<CompletedDialogComponent>) {
  }

  close() {
    this.dialogRef.close({success : true});
  }

}
