import {Component, AfterViewInit} from '@angular/core';
import 'prismjs/';


@Component({
  selector: 'c-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements AfterViewInit {
  lat: number = 37.3875;
  lng: number = -122.0575;

  constructor() {
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }

}
