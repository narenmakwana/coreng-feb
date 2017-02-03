import {Component} from '@angular/core';
import {SampleDialogComponent} from './sample-dialog/sample-dialog.component';
import {MdDialogRef, MdDialog} from '@angular/material';
import {ViewChild} from '../../../../node_modules/@angular/core/src/metadata/di';
import {CodeHighlighterDirective} from '../../shared/layout/code-highlighter/code-highlighter.directive';

@Component({
  selector : 'c-dialog',
  templateUrl : './dialog.component.html',
  styleUrls : ['./dialog.component.scss']
})
export class DialogComponent {
  @ViewChild(CodeHighlighterDirective) code: CodeHighlighterDirective;
  private _results: {success: boolean, data?: {fullName: string}} = {success : false};
  private _dialogRef: MdDialogRef<SampleDialogComponent>;

  constructor(private _dialog: MdDialog) {
  }

  open() {
    this._dialogRef = this._dialog.open(SampleDialogComponent, {
      disableClose : true
    });
    this._dialogRef.componentInstance.fullName = this._results.data ? this._results.data.fullName : '';
    this._dialogRef.afterClosed().subscribe(result => {
      this._results = result;
      this.code.highlight();
      this._dialogRef = null;
    });
  }

  get results(): string {
    return JSON.stringify(this._results, null, '\t');
  }

}
