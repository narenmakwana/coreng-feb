import {Component, AfterViewInit} from '@angular/core';
import {MdSnackBar} from '../../../../node_modules/@angular/material/snack-bar/snack-bar';
import {MdSnackBarRef} from '../../../../node_modules/@angular/material/snack-bar/snack-bar-ref';
import {SimpleSnackBar} from '../../../../node_modules/@angular/material/snack-bar/simple-snack-bar';
import 'prismjs/';

@Component({
  selector : 'c-notifications',
  templateUrl : './notifications.component.html',
  styleUrls : ['./notifications.component.scss']
})
export class NotificationsComponent implements AfterViewInit {
  message: string = 'You\'ve got mail!';
  actionLabel: string = 'View';

  exampleString: string = `@Component({
  selector: 'my-component';,
  providers: [MdSnackBar]
})
export class MyComponent {
 message: string = 'You\'ve got mail!';
 actionLabel: string = 'View';     

 constructor(private _snackBar: MdSnackBar) {}

 open() {
   let snackbarRef: MdSnackBarRef<SimpleSnackBar>; = this._snackBar.open(this.message, this.actionLabel);
   snackbarRef.afterDismissed().subscribe(() => {
     console.log('Notification Dismissed!');
   });
 }

}`;

  constructor(private _snackBar: MdSnackBar) {
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }

  open() {
    let snackbarRef: MdSnackBarRef<SimpleSnackBar> = this._snackBar.open(this.message, this.actionLabel);
    snackbarRef.afterDismissed().subscribe(() => {
      console.log('Notification Dismissed!');
    });
  }

}
