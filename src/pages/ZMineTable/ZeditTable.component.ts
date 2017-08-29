import { Component } from '@angular/core';
import { ZTableName } from '../ZTableName/ZTableName.component';

import { ViewController, NavParams } from 'ionic-angular';
@Component({
  selector: 'editTable',
  templateUrl: 'ZeditTable.component.html'
})
export class ZeditTable {
  data1: any;
  data: any;
  mZtableName;
  header:any;
  constructor(params?: NavParams, public viewCtrl?: ViewController,) {
    this.data1 = params;
  }
  ngAfterContentInit() {
    this.data = this.data1.get('data');
    this.mZtableName=this.data1.get('tableName');
    }
  
  close() {
    this.viewCtrl.dismiss();
  }
}