import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LichCongViecPage } from '../lichcongviec/lichcongviec';
import { CaiDatPage } from '../caidat/caidat';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  TrangThai = 0;
  testRadioOpen: boolean;
  testRadioResult;
  checkTat = false;
  checkBat = false
  idgido;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {

  }
  Lich() {
    this.navCtrl.push(LichCongViecPage);
  }
  CaiDat() {
    let data = {
      toggled: '0'
    };
    //lấy thời gian hẹn đã lưu trong storege
    this.storage.get('trangThaiToggled').then((val) => {
      console.log('trạng thái toggled : ', val);
      if (val != null) {
        if (val == "true") {
          data.toggled='1';
          console.log("data thay đổi true");
        }
        else {
          data.toggled='0';
          console.log("data thay đổi false");
        }
      }
      else {
        data.toggled = '0';
        console.log("Data thay doi null:", data.toggled);
      }

    });

    setTimeout(() => {
      console.log("Gia tri data:", data.toggled);
      this.navCtrl.push(CaiDatPage, data);
    }, 200);
  }
}
