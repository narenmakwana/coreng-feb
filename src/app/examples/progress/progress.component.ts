import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import 'prismjs/';


@Component({
  selector : 'c-progress',
  templateUrl : './progress.component.html',
  styleUrls : ['./progress.component.scss']
})
export class ProgressComponent implements OnInit, AfterViewInit, OnDestroy {
  private myValue: number = 0;
  private myValueBuffer: number = 10;
  private myBufferValue: number = 40;
  private interval: number;

  constructor() {
  }

  ngOnInit() {
    this.interval = window.setInterval(() => {
      this.triggerValueUpdate();
    }, 10);
  }

  triggerValueUpdate(): void {
    this.myValue += 1;
    if(this.myValue > 100) {
      this.myValue = 0;
    }
    this.myValueBuffer += .2;
    if(this.myValueBuffer > 100) {
      this.myValueBuffer = 0;
      this.myBufferValue = 20;
    } else if(this.myValueBuffer >= this.myBufferValue) {
      this.myValueBuffer -= .2;
      this.myBufferValue += 10;
    }
    this.myBufferValue += .1;
    if(this.myBufferValue > 100) {
      this.myBufferValue = 100;
    }
  }

  ngOnDestroy() {
    window.clearInterval(this.interval);
  }

  ngAfterViewInit() {
    Prism.highlightAll(false);
  }
}
