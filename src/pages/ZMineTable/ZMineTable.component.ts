import { Component } from '@angular/core';
import { ViewController,NavController,ModalController, NavParams } from 'ionic-angular';
import { ZeditTable } from './ZeditTable.component'

const gZtempData = {
  mZtableName:'KJ649应力在线监测预警系统日报表',mZarea: '泰安001', mZdetectTime: '201 -XX-XX XX:XX:XX------20XX-XX-XX', mZreportTime: '2015-5-6', mZlength: '500m',
  mZremainLength: '100m', mZtodayLength: '20m', mZmonthLength: '360m', mZtotalLength: '2000m',
  datas: [
    { 
      mZuniqueId: 0, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '1', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '绿色'
    },    { 
      mZuniqueId: 1, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '3', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '红色'
    },    { 
      mZuniqueId: 2, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '9', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '黄色'
    },    { 
      mZuniqueId: 3, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '10', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '绿色'
    },    { 
      mZuniqueId: 4, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '20', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '红色'
    },    { 
      mZuniqueId: 5, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '6', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '绿色'
    },    { 
      mZuniqueId: 6, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '18', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '黄色'
    },    { 
      mZuniqueId: 7, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '3', mZchangeRate: '50%',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '黄色'
    },
    
  ]
}

declare var echarts: any;
@Component({
  selector: 'Strain-Online',
  templateUrl: 'ZMineTable.component.html'
})
export class ZMineTable {
  private headerRight:{icon:string,text:string}={icon:'book',text:'启用'};


  private mZWindowResizeEvent: any;     //系统窗口监听事件

  mZdata = gZtempData;
  echartsShow: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.selectedItem = navParams.get('item');
  }




  ngAfterContentInit() {
    this.headerRight.text='开启编辑';
    this.headerRight.icon='book';

    this.echartsShow = echarts.init(document.getElementById('echarts-table'));
    // 指定图表的配置项和数据
    this.echartsShow.setOption({
      tooltip: { trigger: 'item' },//鼠标停留时的显示信息
      xAxis: {//x坐标轴
        data: this.mZdata.datas.map(function (item) {
          return item.mZuniqueId;
        })
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
        startValue: '0'
      }, {
        disabled: true,
      }],
      visualMap: {
        top: 10,
        right: 10,
        pieces: [
          { gt: 0, lte: 5, color: 'green' },
          { gt: 5, lte: 7.5, color: 'yellow' },
          { gt: 7.5, color: 'red' },
        ],
        color: ['green', 'yellow', 'red'],
        textStyle: { color: '#000000' }
      },
      series: {
        name: '',
        type: 'bar',
        clickable:false,
        roam: false,
        data: this.mZdata.datas.map(function (item) {
          return item.mZnow;
        }),
        label: {
          normal: {
            color: '#000000',
            show: true,
            position: 'top'
          }
        },
        markLine: {
          silent: true,
          data: [{
            yAxis: 5
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
    this.echartsShow.on('mousedown',function(){});
    this.mZWindowResizeEvent = window.onresize;

    window.onresize = function () { echarts.getInstanceByDom(document.getElementById("echarts-table")).resize(); }

  }
  
  changeHeaderRight(){
    if(this.headerRight.text=="开启编辑"){
      this.headerRight.text="编辑中";
      this.headerRight.icon='brush';

    }
    else{
      this.headerRight.text="开启编辑"
      this.headerRight.icon='book';
    }
  }

  showEdit(data?,tableName?){
    if(this.headerRight.text=="开启编辑"){
      let profileModal = this.modalCtrl.create(ZeditTable,{thisData:data,name:tableName});
      profileModal.present();
    }
  }

  ngOnDestroy() {
    window.onresize = this.mZWindowResizeEvent;
  }


}


