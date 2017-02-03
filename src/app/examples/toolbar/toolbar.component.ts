import {Component, AfterViewInit} from '@angular/core';
import 'prismjs/';

@Component({
  selector: 'c-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }
}
