import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { ZeditTable } from './ZeditTable.component'

const gZtempData = {
  mZtableName: 'KJ649应力在线监测预警系统日报表', mZarea: '泰安001', mZdetectTime: '201 -XX-XX XX:XX:XX------20XX-XX-XX', mZreportTime: '2015-5-6', mZlength: '500m',
  mZremainLength: '100m', mZtodayLength: '20m', mZmonthLength: '360m', mZtotalLength: '2000m',
  datas: [
    {
      mZuniqueId: 0, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '1', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '绿色'
    }, {
      mZuniqueId: 1, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '3', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '红色'
    }, {
      mZuniqueId: 2, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '9', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '黄色'
    }, {
      mZuniqueId: 3, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '10', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '绿色'
    }, {
      mZuniqueId: 4, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '20', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '红色'
    }, {
      mZuniqueId: 5, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '6', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '绿色'
    }, {
      mZuniqueId: 6, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '18', mZchangeRate: '50',
      mZnowChange: '5', mZmax: '5000', mZmaxTime: '10:22:10', mZwarningLevel: '黄色'
    }, {
      mZuniqueId: 7, mZname: '第一坑道', mZlength: '100', mZdeep: '150', mZfirst: '0', mZnow: '3', mZchangeRate: '50',
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
  private headerRight: { icon: string, text: string } = { icon: 'book', text: '启用' };
  private mZWindowResizeEvent: any;     //系统窗口监听事件
  private mZdata = gZtempData;          //外部临时数据
  private echartsShow: any;             //Echarts图表
  private edittingData: any;             //编辑数据传输变量

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    //this.selectedItem = navParams.get('item');
  }




  ngAfterContentInit() {
    //头部右侧内容
    this.headerRight.text = '编辑中';
    this.headerRight.icon = 'book';

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
        clickable: false,
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
    this.echartsShow.on('mousedown', function () { });
    this.mZWindowResizeEvent = window.onresize;

    window.onresize = function () { echarts.getInstanceByDom(document.getElementById("echarts-table")).resize(); }

  }

  //头部编辑按钮
  changeHeaderRight() {
    if (this.headerRight.text == "开启编辑") {
      this.headerRight.text = "编辑中";
      this.headerRight.icon = 'brush';

    }
    else {
      this.headerRight.text = "开启编辑"
      this.headerRight.icon = 'book';
    }
  }

  showEditHead() {

    if (this.headerRight.text == "编辑中") {
      let profileModal = this.modalCtrl.create(ZeditTable, {
        tableName: this.mZdata.mZtableName,
        data: [//标题,控件类型(1字符和2数字,3枚举),传入值(),范围界限(枚举的个数的两倍),范围参数(枚举特殊)
          { name: '监测日期', type: 'text', data: this.mZdata.mZdetectTime, limitCount: 1, min: 0, max: 20 },
          { name: '上报日期', type: 'text', data: this.mZdata.mZreportTime, limitCount: 1, min: 0, max: 20 },
          { name: '设计长度', type: 'text', data: this.mZdata.mZlength, limitCount: 1, min: 0, max: 20 },
          { name: '剩余长度', type: 'text', data: this.mZdata.mZremainLength, limitCount: 1, min: 0, max: 20 },
          { name: '本日进尺', type: 'text', data: this.mZdata.mZtodayLength, limitCount: 1, min: 0, max: 20 },
          { name: '本月累计进尺', type: 'text', data: this.mZdata.mZmonthLength, limitCount: 1, min: 0, max: 20 },
          { name: '总进尺', type: 'text', data: this.mZdata.mZtotalLength, limitCount: 1, min: 0, max: 20 },
        ]
      });

      profileModal.onDidDismiss(data => {
        if (!data) return;
        let index = 0;
        this.mZdata.mZdetectTime = data[index++].data;
        this.mZdata.mZreportTime = data[index++].data;
        this.mZdata.mZlength = data[index++].data;
        this.mZdata.mZremainLength = data[index++].data;
        this.mZdata.mZtodayLength = data[index++].data;
        this.mZdata.mZmonthLength = data[index++].data;
        this.mZdata.mZtotalLength = data[index++].data;

      });
      profileModal.present();
    }
  }





  showEditData(data?, tableName?) {
    if (this.headerRight.text == "编辑中") {

      this.edittingData = data;
      data.isSelect = 'tableSelected';
      let profileModal = this.modalCtrl.create(ZeditTable, {
        tableName: tableName,
        data: [//标题,控件类型(1字符和2数字,3枚举),传入值(),范围界限(枚举的个数的两倍),范围参数(枚举特殊)
          { name: '测点名称', type: 'text', data: data.mZname, limitCount: 1, min: 0, max: 20 },
          { name: '距离开口距离(m)', type: 'number', data: data.mZlength, limitCount: 2, min: 0, max: 500 },
          { name: '安装深度(m)', type: 'number', data: data.mZdeep, limitCount: 2, min: 0, max: 500 },
          { name: '初始预压(Mpa)', type: 'number', data: data.mZfirst, limitCount: 2, min: 0, max: 500 },
          { name: '当前应力值', type: 'number', data: data.mZnow, limitCount: 2, min: 0, max: 500 },
          { name: '增幅变化率(%)', type: 'number', data: data.mZchangeRate, limitCount: 2, min: 0, max: 100 },
          { name: '当日变化量(±Mpa)', type: 'number', data: data.mZnowChange, limitCount: 2, min: 0, max: 500 },
          { name: '最大值(Mpa)', type: 'number', data: data.mZmax, limitCount: 2, min: 0, max: 500 },
          { name: '最大值时刻', type: 'text', data: data.mZmaxTime, limitCount: 1, limit: 40 },
          { name: '预警级别', type: 'emun', data: data.mZwarningLevel, limitCount: 6, limit: [0, '绿色', 1, '黄色', 2, '红色'] },
        ]
      });

      profileModal.onDidDismiss(data => {
        this.edittingData.isSelect = ""
        if (!data) return;
        let index = 0;
        this.edittingData.mZname = data[index++].data;
        this.edittingData.mZlength = data[index++].data;
        this.edittingData.mZdeep = data[index++].data;
        this.edittingData.mZfirst = data[index++].data;
        this.edittingData.mZnow = data[index++].data;
        this.edittingData.mZchangeRate = data[index++].data;
        this.edittingData.mZnowChange = data[index++].data;
        this.edittingData.mZmax = data[index++].data;
        this.edittingData.mZmaxTime = data[index++].data;
        this.edittingData.mZwarningLevel = data[index++].data;
        this.echartsShow.setOption({
          series: {
            data: this.mZdata.datas.map(function (item) {
              return item.mZnow;
            })
          }
        })
        this.edittingData = null;
      });
      profileModal.present();
    }
  }

  ngOnDestroy() {
    //必要,调整窗口时必须使用
    window.onresize = this.mZWindowResizeEvent;
  }


}


