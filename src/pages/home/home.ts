import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LichCongViecPage } from '../lichcongviec/lichcongviec';
import { CaiDatPage } from '../caidat/caidat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  TrangThai = 0;
  testRadioOpen: boolean;
  testRadioResult;
  checkTat =false;
  checkBat=false;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }
  Lich() {
    this.navCtrl.push(LichCongViecPage);
  }
  CaiDat() {
    this.navCtrl.push(CaiDatPage);
  }
  // showOption() {
  //   let alert;
  //   if (this.TrangThai == 0) {
  //     alert = this.alertCtrl.create({
  //       title: "Thông Báo!",
  //       subTitle: "Bạn có muốn bật báo trước cho công việc này!",
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           handler: data => {
  //             console.log('Cancel clicked');
  //           }
  //         },
  //         {
  //           text: 'Bật',
  //           handler: data => {
  //             this.TrangThai = 1;
  //             console.log('Bật clicked');
  //           }
  //         }
  //       ]
  //     });
  //   }
  //   else {
  //     alert = this.alertCtrl.create({
  //       title: "Thông Báo!",
  //       subTitle: "Bạn muốn tắt báo trước cho công việc này!",
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           handler: data => {
  //             console.log('Cancel clicked');
  //           }
  //         },
  //         {
  //           text: 'Tắt',
  //           handler: data => {
  //             this.TrangThai = 0;
  //             console.log('Tắt clicked');
  //           }
  //         }
  //       ]
  //     });
  //   }
  //   alert.present();
  // }
  // showOption1(){
  //   if(this.TrangThai==0){
  //     this.checkBat=false;
  //     this.checkTat=true;
  //   }
  //   else{
  //     this.checkBat=true;
  //     this.checkTat=false;
  //   }
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('Lựa Chọn');
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Tắt',
  //     value: '0',
  //     checked: this.checkTat
  //   });
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Bật',
  //     value: '1',
  //     checked: this.checkBat
  //   });
  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'Ok',
  //     handler: data => {
  //       console.log('Radio data:', data);
  //       console.log(data);
  //       if(data=="1"){
  //         this.TrangThai=1;
  //       }
  //       if(data=="0"){
  //         this.TrangThai=0;
  //       }
  //       console.log(this.TrangThai);
  //       this.testRadioOpen = false;
  //       this.testRadioResult = data;
  //       console.log(this.testRadioResult);
        
  //     }
  //   });
  //   alert.present().then(() => {
  //     this.testRadioOpen = true;
  //     console.log(this.testRadioResult);
      
  //   });
  // }
}
