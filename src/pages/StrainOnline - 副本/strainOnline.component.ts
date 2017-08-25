import { Component } from '@angular/core';

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
  }
]

}
@Component({
  selector: 'strain',
  templateUrl: './strainOnline.component.html',
  styleUrls: ['./strainOnline.component.css']
})
export class StrainOnlineComponent {
  cell: StrainData;
  data = tempDAta;
  constructor() { }
}
