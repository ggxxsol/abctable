import { Component } from '@angular/core';
import { ZTableName } from '../ZTableName/ZTableName.component';

import { ViewController, NavParams, AlertController  } from 'ionic-angular';
@Component({
  selector: 'editTable',
  templateUrl: 'ZeditTable.component.html'
})
export class ZeditTable {
  paramsData: any;
  data: any;
  mZtableName;
  header: any;
  constructor(params?: NavParams, public viewCtrl?: ViewController, public alertCtrl?: AlertController) {
    this.paramsData = params;
  }
  ngAfterContentInit() {
    this.data = this.paramsData.get('data');
    this.mZtableName = this.paramsData.get('tableName');
  }

  clickOk() {
    var pattern = new RegExp("[~'!@#$%^&*()-+_=]");
    for (let i = 0; i < this.data.length; i++) {
      if (pattern.test(this.data[i].data)) {
        this.showAlert("警告:\"" + this.data[i].name + "\"输入有误!");
        return;
      }
      switch (this.data[i].type) {
        case 'text':

          break;
        case 'number':
          if (parseFloat(this.data[i].data) == NaN) {
            this.showAlert("警告:\"" + this.data[i].name + "\"没有输入有效的数字!");
            return;
          }
          break;
        case 'emun':

          break;
        default:
          break;
      }
    }
    this.viewCtrl.dismiss(this.data);
  }

  clickCancle() {
    this.viewCtrl.dismiss();
  }
  private processData(data) {
  }

  private showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  showRadio(cell) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');
    for(let i=0;i<cell.limit.length/2;i++){
      alert.addInput({
        type: 'radio',
        label: cell.limit[i*2+1],
        value: cell.limit[i*2+1],
        checked: false,
      });
    }
    


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        cell.data=data;
      }
    });
    alert.present();
  }
}