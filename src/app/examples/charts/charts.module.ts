import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartModule} from 'angular2-highcharts';
import {GithubService} from '../../shared/services/github.service';
import {ServerLoadChartComponent} from './server-load-chart/server-load-chart.component';

@NgModule({
  imports : [
    CommonModule,
    ChartModule
  ],
  exports : [ServerLoadChartComponent],
  declarations : [ServerLoadChartComponent],
  providers : [GithubService]
})
export class ChartsModule {
  public static generateRandomData(min: number, max: number, dataPoints?: number): number[] {
    let size: number = dataPoints || ChartsModule.getRandomInt(5, 15);
    let data: number[] = [];
    for (let i = 0; i < size; i++) {
      data.push(ChartsModule.getRandomInt(min, max));
    }
    return data;
  }

  public static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
