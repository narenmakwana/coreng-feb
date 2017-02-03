import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

/*

 Dialogs currently DO NOT WORK when declared (inside the "declarations" array of the NgModule) inside a lazy loaded ngModule.
 To fix this, just put all dialog components inside your main AppModule
 You will also NEED to add the dialog to the "entryComponents" array inside the ngModule as well!

 */
@Component({
  selector : 'c-sample-dialog',
  template : `
    <md-card>
      <md-card-title>Sample Dialog</md-card-title>
      <md-card-content>
        I'm some sample content. I can be anything. I could be a login form, a form to add data to a table. I can return any data to my parent component!
        <br/>
        <div>
          <md-input [(ngModel)]="fullName" placeholder="Full Name"></md-input>
        </div>
      </md-card-content>
      <md-card-actions align="end">
        <button md-raised-button color="warn" (click)="cancel()">Cancel</button>
        <button md-raised-button color="primary" (click)="confirm()">Confirm</button>
      </md-card-actions>
    </md-card>
  `,
  styles : []
})
export class SampleDialogComponent {
  fullName: string = '';

  constructor(public dialogRef: MdDialogRef<SampleDialogComponent>) {
  }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close({success : true, data : {fullName : this.fullName}});
  }

  cancel() {
    this.dialogRef.close({success : false});
  }

}
