import {Component, AfterViewInit} from '@angular/core';
import 'prismjs/';
@Component({
  selector: 'c-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }
}
