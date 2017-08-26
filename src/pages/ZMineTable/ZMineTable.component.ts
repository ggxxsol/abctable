import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
const gZtempData = {
  area: '泰安001', detectTime: '2015-5-5    -----    2015-5-6', reportTime: '2015-5-6', length: '500m',
  remainLength: '100m', todayLength: '20m', monthLength: '360m', totalLength: '2000m',
  datas: [
    {
      uniqueId:0, name: '第一坑道', length: '100', deep: '150', first: '0', now: '5', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '绿色'
    },
    {
      uniqueId:1, name: '第一坑道', length: '100', deep: '150', first: '0', now: '6', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '黄色'
    },
    {
      uniqueId:2, name: '第一坑道', length: '100', deep: '150', first: '0', now: '14', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '黄色'
    },
    {
      uniqueId:3, name: '第一坑道', length: '100', deep: '150', first: '0', now: '10', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      uniqueId:4, name: '第一坑道', length: '100', deep: '150', first: '0', now: '25', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      uniqueId:0, name: '第一坑道', length: '100', deep: '150', first: '0', now: '14', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      uniqueId:0, name: '第一坑道', length: '100', deep: '150', first: '0', now: '5', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      uniqueId:0, name: '第一坑道', length: '100', deep: '150', first: '0', now: '8', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    },
    {
      uniqueId:0, name: '第一坑道', length: '100', deep: '150', first: '0', now: '9', changeRate: '50%',
      nowChange: '5', max: '5000', maxTime: '10:22:10', warningLevel: '红色'
    }
  ]
}

declare var echarts: any;
@Component({
  selector: 'Strain-Online',
  templateUrl: 'ZMineTable.component.html'
})
export class ZMineTable {
  private mZWindowResizeEvent:any;     //系统窗口监听事件

  data = gZtempData;
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
    this.echartsShow = echarts.init(document.getElementById('echarts-table'))

    // 指定图表的配置项和数据
    this.echartsShow.setOption({
      tooltip: {trigger: 'item'},//鼠标停留时的显示信息
      xAxis: {//x坐标轴
          data: this.data.datas.map(function (item) {
            return item.uniqueId;})
      },
      yAxis: {
          splitLine: {
              show: false
          }
      },
      toolbox: {
          left: 'center',
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
          }
      },
      dataZoom: [{
          startValue: '2014-06-01'
      }, {
          type: 'inside'
      }],
      visualMap: {
        top: 10,
        right: 10,
        pieces:[
          {gt: 0,lte:5,color:'green'},
          {gt: 5,lte:7.5,color:'yellow'},
          {gt: 7.5,color:'red'},
        ],
        color: ['green','yellow','red'],
        textStyle: {color: '#000000'}
    },
      series: {
          name: '',
          type: 'bar',
          data: this.data.datas.map(function (item) {
            return item.now;}),
             label: {
            normal: {
              color:'#000000',
                show: true,
                position: 'top'
            }},
          markLine: {
              silent: true,
              data: [{yAxis: 5
              }, {
                  yAxis: 10
              }, {
                  yAxis: 15
              }, {
                  yAxis: 20
              }, {
                  yAxis: 25
              }]
          }
      }
  })

    // 使用刚指定的配置项和数据显示图表。
    //this.echartsShow.setOption(option);
    this.mZWindowResizeEvent=window.onresize;

    window.onresize=function(){echarts.getInstanceByDom(document.getElementById("echarts-table")).resize();}
    /*this.sizeCheckInterval = setInterval(() => {
      document.getElementById('show').innerHTML= document.getElementById('echarts-table').offsetWidth.toString();
      this.reSize$.next(this.echartsDiv.offsetWidth);
    }, 10000);*/
    /*this.onResize = this.reSize$.distinctUntilChanged().delay(400).subscribe((_) => {
      this.echartsShow.resize();
    });*/
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    window.onresize=this.mZWindowResizeEvent;
    /*if (this.sizeCheckInterval) clearInterval(this.sizeCheckInterval);
    this.reSize$.complete();*/
  }


}
