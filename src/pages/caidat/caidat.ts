import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-caidat',
  templateUrl: 'caidat.html'
})
export class CaiDatPage {

  ThoiGianHen = 0;
  ThoiGianLap = 0;
  TT_ThoiGianHen = 0;
  isToggled = false;
  ThoiGianHen_Nhap;
  constructor(public navCtrl: NavController, public storage: Storage,
    public alertCtrl: AlertController) {

    //lấy thời gian hẹn đã lưu trong storege

    this.getThoiGianHen();
    //lấy thời gian lặp đã lưu trong storege

    this.getThoiGianLap();
  }

  setThoiGianHenChon() {
    //lưu thời gian hẹn mới theo thời gian chọn
    console.log("thời gian hẹn :" + this.ThoiGianHen);
    this.storage.set('thoiGianHen', `${this.ThoiGianHen}`);
    setTimeout(() => {
      this.storage.get('thoiGianHen').then((val) => {
        console.log('thời gian hẹn : ', val);
        this.ThoiGianHen = val;
      });
    }, 500);

  }
  setThoiGianLapChon() {
    //lưu thời gian lặp mới
    console.log("thời gian lặp :" + this.ThoiGianLap);
    this.storage.set('thoiGianLap', `${this.ThoiGianLap}`);
    setTimeout(() => {
      this.storage.get('thoiGianLap').then((val) => {
        console.log('thời gian lặp : ', val);
        this.ThoiGianLap = val;
      });
    }, 500);
  }
  setThoiGianHenNhap() {
    //lưu thời gian hẹn mới theo thời gian mình nhập vào
    if (this.ThoiGianHen_Nhap == null) {
      this.ThoiGianHen_Nhap = 0;
    }
    console.log("thời gian hẹn :" + this.ThoiGianHen_Nhap);
    this.storage.set('thoiGianHen', `${this.ThoiGianHen_Nhap}`);
    setTimeout(() => {
      this.storage.get('thoiGianHen').then((val) => {
        console.log('thời gian hẹn : ', val);
        this.ThoiGianHen_Nhap = val;
      });
    }, 500);
  }
  getThoiGianHen() {
    //lấy thời gian hẹn đã lưu trong storege
    this.storage.get('thoiGianHen').then((val) => {
      console.log('thời gian hẹn : ', val);
      if (val != null) {
        console.log(val);
        this.ThoiGianHen = val;
      }

    });
    console.log("Thời gian hẹn :");
    console.log(this.ThoiGianHen);
  }
  getThoiGianLap() {
    //lấy thời gian lặp trong storege
    this.storage.get('thoiGianLap').then((val) => {
      console.log('thời gian lặp : ', val);
      if (val != null) {
        console.log(val);
        this.ThoiGianLap = val;
      }
    });
    console.log("Thời gian lặp :");
    console.log(this.ThoiGianLap);
  }
  HenGio() {
    //hẹn giờ nếu isToggled == true thì lấy thời gian hẹn theo cách nhập 
    // == false thì lấy thời gian hẹn theo cách chọn.
    if (this.isToggled == true) {
      if (this.ThoiGianHen_Nhap * 1 < 0) {
        this.HienThongBao("Thông Báo", "Thời gian hẹn không được nhỏ hơn 0 !");
        return;
      }
      else {
        if (this.ThoiGianHen_Nhap * 1 < this.ThoiGianLap) {
          this.HienThongBao("Thông Báo", "Thời gian lặp không được lớn hơn thời gian hẹn!");
          return;
        }
        else {
          this.setThoiGianHenNhap();
          this.setThoiGianLapChon();
        }
      }
    }
    else {
      // if (this.ThoiGianHen < this.ThoiGianLap) {
      //   this.HienThongBao("Thông Báo", "Thời gian lặp không được lớn hơn thời gian hẹn!");
      //   return;
      // }
      // else {
        this.setThoiGianHenChon();
        this.setThoiGianLapChon();
      // }
    }
    //hiển thị thời gian đã lưu
    this.getThoiGianHen();
    this.getThoiGianLap();

    this.HienThongBao("Thông Báo", "Đã đặt thời gian thành công!");
  }

  HienThongBao(title, sub) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: sub,
      buttons: ['OK']
    });
    alert.present();
  }

  //thay đổi cách lấy thời gian hẹn theo isToggled.
  TgianHenTT() {
    if (this.isToggled == true) {
      this.TT_ThoiGianHen = 1;
    }
    else {
      this.TT_ThoiGianHen = 0;
    }
  }

}
