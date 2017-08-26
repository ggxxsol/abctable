import { Component, ViewChild } from '@angular/core';

import { Subject, Subscription } from "rxjs";

import { NavController, NavParams } from 'ionic-angular';
import { StrainData } from './straindata';


const tempDAta: StrainData = {
  area: '泰安001', detectTime: '2015-5-5    -----    2015-5-6', reportTime: '2015-5-6', length: '500m',
  remainLength: '100m', todayLength: '20m', monthLength: '360m', totalLength: '2000m',
  datas: [
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '绿色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '黄色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '黄色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      name: '第一坑道', length: '100', deep: '150', first: '0', now: '1', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    }
  ]
}
declare var echarts: any;
@Component({
  selector: 'Strain-Online',
  templateUrl: 'StrainOnline.html'
})
export class StrainOnline {
  private echartsDiv:any;

  private reSize$ = new Subject<string>();
  private onResize: Subscription = null;
  private sizeCheckInterval = null;

  data = tempDAta;
  echartsShow: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if (!this.selectedItem) {

    }

  }

  ngAfterContentInit() {

    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.echartsDiv=document.getElementById('echarts-table');
    this.echartsShow = echarts.init(this.echartsDiv)

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.echartsShow.setOption(option);

    this.sizeCheckInterval = setInterval(() => {
      document.getElementById('show').innerHTML= document.getElementById('echarts-table').offsetWidth.toString();
      this.reSize$.next(this.echartsDiv.offsetWidth);
    }, 1000);
    this.onResize = this.reSize$.distinctUntilChanged().delay(2000).subscribe((_) => {
      this.echartsShow.resize();
      
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sizeCheckInterval) clearInterval(this.sizeCheckInterval);
    this.reSize$.complete();
  }


}
