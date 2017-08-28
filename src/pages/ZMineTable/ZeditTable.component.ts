import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';
@Component({
    selector: 'editTable',
    templateUrl: 'ZeditTable.component.html'
  })
  export class ZeditTable{
    data1:any;
    data:any;
    mZtableName:string;
    constructor(params?: NavParams,public viewCtrl?: ViewController) {
      this.data1=params;
    }
    ngAfterContentInit() {
        this.data=this.data1.get('thisData');
        this.mZtableName=this.data1.get('name');
    }
  
    close(){
      this.viewCtrl.dismiss();
    }
  }