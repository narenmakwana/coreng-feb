import {Component} from '@angular/core';
import {MdDialogRef} from '../../../../../node_modules/@angular/material/dialog/dialog-ref';

@Component({
  selector : 'c-sample-menu-dialog',
  template : `
    <md-card>
      <md-card-title>Menu Item</md-card-title>
      <md-card-content>
        You can make anything happen on a MenuItem's click event!
      </md-card-content>
      <md-card-actions align="end">
        <button md-raised-button color="primary" (click)="close()">Close</button>
      </md-card-actions>
    </md-card>
  `,
  styles : []
})
export class SampleMenuDialogComponent {

  constructor(private _dialogRef: MdDialogRef<SampleMenuDialogComponent>) {
  }

  close() {
    this._dialogRef.close({success : true});
  }

}
