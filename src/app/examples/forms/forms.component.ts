import {Component, AfterViewInit} from '@angular/core';
import 'prismjs/';

@Component({
  selector : 'c-forms',
  templateUrl : './forms.component.html',
  styleUrls : ['./forms.component.scss']
})
export class FormsComponent implements AfterViewInit {
  dividerColor: boolean;
  requiredField: boolean;
  floatingLabel: boolean;
  name: string;
  items: any[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];

  constructor() {
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }
}

