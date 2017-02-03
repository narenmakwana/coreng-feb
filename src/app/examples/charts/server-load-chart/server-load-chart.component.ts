import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChartsModule} from '../charts.module';
import {NavigationService} from '../../../navigation/navigation.service';
import {Subscription} from 'rxjs';

@Component({
  selector : 'c-server-load-chart',
  templateUrl : './server-load-chart.component.html',
  styleUrls : ['./server-load-chart.component.scss']
})
export class ServerLoadChartComponent implements OnInit, OnDestroy {

  private chart: any;
  private options: any;
  private data: [number, number][] = [];

  private _interval: number;
  private _navSubscription: Subscription;

  constructor(private _navigation: NavigationService) {
  }

  ngOnInit() {
    this._navSubscription = this._navigation.windowSize.subscribe(sizeChange => {
      if(this.chart !== undefined && this.chart !== null) {
        this.chart.reflow();
      }
    });
    for (let i = 60; i >= 0; i--) {
      this.data.push(this.generateDataPoint(new Date().getTime() - (1000 * i)));
    }
    this._interval = window.setInterval(() => {
      this.chart.series[0].addPoint(this.generateDataPoint(), true, true);
    }, 1000);
    this.options = {
      chart : {
        zoomType : 'x'
      },
      title : {
        text : null
      },
      subtitle : {
        text : document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis : {
        type : 'datetime'
      },
      yAxis : {
        title : {
          text : 'Server Load (%)'
        }
      },
      legend : {
        enabled : false
      },
      series : [{
        type : 'area',
        name : 'Server Load (%)',
        data : this.data
      }]
    };
  }

  ngOnDestroy() {
    window.clearInterval(this._interval);
    this._navSubscription.unsubscribe();
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  private _counter = 0;

  private generateDataPoint(time: number = new Date().getTime()): [number, number] {
    if(this._counter > 5) {
      this._counter = 0;
    } else {
      this._counter++;
    }
    if(this._counter === 0 && this.data.length > 60) {
      this._counter++;
      return [time, ChartsModule.generateRandomData(5, 80, 1)[0]];
    }
    if(this.data.length === 0) {
      return [time, 5];
    }
    let last = this.data[this.data.length - 1][1];
    let diff = ChartsModule.getRandomInt(0, this.data.length < 60 ? ChartsModule.getRandomInt(0, 1) : 2);
    if(ChartsModule.getRandomInt(0, 1) === 1 && last - diff > 0) {
      return [time, last - diff];
    } else {
      return [time, last + diff];
    }
  }

}
