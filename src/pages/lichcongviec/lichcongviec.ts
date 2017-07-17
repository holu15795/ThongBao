import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications, BackgroundMode } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';


@Component({
    selector: 'page-lichcongviec',
    templateUrl: 'lichcongviec.html'
})
export class LichCongViecPage {
    /**
     * khong chon la ngay hien tai
     *  -> show list theo time cua 1 ngay
     * chon ngay khac 
     *   -> clear list -> show list 
     * chon 1 ngay theo calender 
     *      
     */
    Lich = [{
        id: 1,
        NoiDung: "Lên lớp C#",
        ThoiGian: "21:33",
        Ngay: "2017/7/15"
    }, {
        id: 2,
        NoiDung: "Lập trình hướng đối tượng",
        ThoiGian: "21:35",
        Ngay: "2017/7/16"
    }, {
        id: 3,
        NoiDung: "asp.net",
        ThoiGian: "21:37",
        Ngay: "2017/7/16"
    }, {
        id: 4,
        NoiDung: "Lên lớp C#",
        ThoiGian: "21:39",
        Ngay: "2017/7/17"
    }, {
        id: 5,
        NoiDung: "Họp",
        ThoiGian: "21:41",
        Ngay: "2017/7/16"
    }, {
        id: 6,
        NoiDung: "Họp team",
        ThoiGian: "21:43",
        Ngay: "2017/8/17"
    }, {
        id: 7,
        NoiDung: "Đá bóng",
        ThoiGian: "21:45",
        Ngay: "2017/7/17"
    }, {
        id: 8,
        NoiDung: ".Net",
        ThoiGian: "21:47",
        Ngay: "2017/7/17"
    }, {
        id: 9,
        NoiDung: "Lớp Node",
        ThoiGian: "21:49",
        Ngay: "2017/7/17"
    }, {
        id: 10,
        NoiDung: "Báo cáo",
        ThoiGian: "10:50",
        Ngay: "2017/7/17"
    }];
    Detail = {
        id: 0,
        NoiDung: "không",
        ThoiGian: "0",
        Ngay: ""
    }
    ThoiGianHen = 0;
    ThoiGianLap = 0;
    SoLanLap = 0;
    GioCv; PhutCv;
    NgayCv; ThangCv;
    TrangThai = 0;
    Checked = false;
    idNotify;
    checkTat = false;
    checkBat = false;
    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        public storage: Storage, public actionSheetCtrl: ActionSheetController) {
        //lấy thời gian hẹn đã lưu trong storege
        storage.get('thoiGianHen').then((val) => {
            console.log('thời gian hẹn : ', val);
            if (val != null) {
                console.log(val);
                this.ThoiGianHen = val;
            }
            else {
                this.ThoiGianHen = 30;
            }
        });
        //lấy thời gian lặp đã lưu trong storege
        storage.get('thoiGianLap').then((val) => {
            console.log('thời gian lặp : ', val);
            if (val != null) {
                console.log(val);
                this.ThoiGianLap = val;
            }
            else {
                this.ThoiGianLap = 5;
            }
        });
        this.Lich.forEach(element => {
            element["TrangThai"] = 0;
        });
    }
    ionViewDidLoad() {
        // this.TonTai();
    }
    XoaAll() {
        //xóa tất cả notify đã đặt
        LocalNotifications.cancelAll().then(results => {
            console.log("Canncel all:");
            console.log(results);
        });
        LocalNotifications.clearAll().then(results => {
            console.log("Clear all:");
            console.log(results);
        });
        this.HienThongBao("Thông Báo", "Xóa All");
        console.log("Xóa All");
    }
    showSheet(id) {
        //cộng id thêm 1 dãy để tạo id notify khác nhau của id đó.
        this.idNotify = id + (15071995 * 1);
        this.KiemTra(this.idNotify);
        let actionSheet;
        this.Lich.forEach(element => {
            if (element.id == id) {
                this.Detail.id = element.id;
                this.Detail.NoiDung = element.NoiDung;
                this.Detail.ThoiGian = element.ThoiGian;
                this.Detail.Ngay=element.Ngay;
            }
        });

        setTimeout(() => {
            if (this.TrangThai == 0) {
                this.checkBat = false;
                this.checkTat = true;
            }
            else {
                this.checkBat = true;
                this.checkTat = false;
            }
            let alert = this.alertCtrl.create();
            alert.setTitle('Lựa Chọn');
            alert.addInput({
                type: 'radio',
                label: 'Tắt',
                value: '0',
                checked: this.checkTat
            });
            alert.addInput({
                type: 'radio',
                label: 'Bật',
                value: '1',
                checked: this.checkBat
            });
            alert.addButton('Cancel');
            alert.addButton({
                text: 'Ok',
                handler: data => {
                    console.log('Radio data:', data);
                    console.log(data);
                    if (data == "1") {
                        if (this.TrangThai == data) {
                            this.HienThongBao("Thông Báo!", "Công việc này đã được đặt trước đó!");
                        }
                        else {
                            this.TrangThai = 1;
                            this.DatThongBao();
                        }

                    }
                    if (data == "0") {
                        if (this.TrangThai == data) {
                            this.HienThongBao("Thông Báo!", "Công việc này chưa được đặt thông báo!");
                        }
                        else {
                            this.TrangThai = 0;
                            this.XoaTb();
                        }

                    }


                }
            });
            alert.present().then(() => {
                console.log(this.TrangThai);

            });
        }, 200);



    }
    DatThongBao() {
        this.TachThoiGian();
        this.HienNotify();
    }
    nhaynhay(id: number, checked: boolean) {
        this.Lich.forEach(element => {
            if (element.id == id) {
                this.Detail.id = element.id;
                this.Detail.NoiDung = element.NoiDung;
                this.Detail.ThoiGian = element.ThoiGian;
            }
        });
        if (checked == true) {
            this.HienThongBao("Thông Báo", "Đã hẹn giờ!");
            this.TachThoiGian();
            this.HienNotify();
        }
        else {
            this.XoaTb();
        }
        console.log(this.Detail.id);


    }
    HienThongBao(title, sub) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: sub,
            buttons: ['OK']
        });
        setTimeout(() => {
            alert.present();
        }, 200)
    }
    TachNgay() {
        this.ThangCv = this.Detail.Ngay.split('/')[1];
        this.NgayCv = this.Detail.Ngay.split('/')[2];
        console.log("ngày cv:");
        console.log(this.NgayCv);
        console.log("thang cv:");
        console.log(this.ThangCv);

    }
    TachThoiGian() {
        //lấy thời gian của công việc tách ra để cài thời gian hẹn của notify
        this.GioCv = this.Detail.ThoiGian.split(':')[0];
        this.PhutCv = this.Detail.ThoiGian.split(':')[1];
        console.log(this.GioCv);
        console.log(this.PhutCv);

    }
    HienNotify() {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        // var hours = d.getHours();
        // var minutes = d.getMinutes();
        this.TachNgay();
        this.SoLanLap = this.ThoiGianHen / this.ThoiGianLap;
        //thời gian báo.
        if (this.PhutCv - this.ThoiGianHen < 0) {
            this.GioCv = this.GioCv - 1;
            this.PhutCv = 60 - (this.ThoiGianHen - this.PhutCv);
        }
        else {
            this.PhutCv = this.PhutCv - this.ThoiGianHen;
        }
        console.log(this.GioCv + "---" + this.PhutCv);
        if (this.NgayCv > day && this.ThangCv == month) {
            day = this.NgayCv;
        }
        else {
            if (this.ThangCv > month) {
                month = this.ThangCv-1;
                day = this.NgayCv;
            }
        }
        var reminder = new Date(year, month, day, this.GioCv, this.PhutCv, 0);
        console.log(reminder);
        let notifi;
        this.idNotify = this.Detail.id;
        if (this.NgayCv < day) {
            this.HienThongBao("Thông Báo!", "Công việc đã qua không thể đặt thông báo!")
        }
        else {
            if (d > reminder) {
                this.HienThongBao("Thông Báo!", "Công việc đã qua không thể đặt thông báo!");
            }
            else {
                for (let i = 0; i < this.SoLanLap + 1; i++) {
                    if (i > 0) {
                        this.PhutCv = (this.PhutCv + this.ThoiGianLap * 1);
                    }

                    this.idNotify = this.idNotify + (15071995 * 1);
                    console.log(i);
                    console.log(year + "-" + month + "-" + day + "-" + this.GioCv + "-" + this.PhutCv);

                    reminder = new Date(year, month, day, this.GioCv, this.PhutCv, 0);
                    console.log(reminder);
                    notifi = {
                        id: this.idNotify,
                        title: "Đến Giờ Hẹn !!!",
                        text: `Công Việc : ${this.Detail.NoiDung} - Thời Gian : ${this.Detail.ThoiGian}`,
                        at: reminder,
                        icon: "file://assets/img/clock1.png"
                    };
                    LocalNotifications.schedule(notifi);
                    console.log(notifi);
                    BackgroundMode.enable();
                }
                this.HienThongBao("Thông Báo", "Đã hẹn giờ!");
            }
        }


    }
    XoaTb() {
        this.idNotify = this.Detail.id;
        for (let i = 0; i < 30; i++) {
            this.idNotify = this.idNotify + (15071995 * 1);
            console.log(this.idNotify);
            LocalNotifications.cancel(this.idNotify).then(results => {
                console.log("Cancel:");
                console.log(results);

            });
            LocalNotifications.clear(this.idNotify).then(results => {
                console.log("Clear:");
                console.log(results);

            })
        }

        setTimeout(() => {
            this.HienThongBao("Thông Báo", "Đã xóa đặt giờ !");
        }, 300)
    }
    TonTai() {
        //kiểm tra xem công việc nào đã được đặt
        this.Lich.forEach(element => {
            LocalNotifications.isScheduled(element.id).then(results => {
                if (results == true) {
                    console.log(element.id + "-" + results);
                    this.TrangThai = 1;
                    this.Checked = results;
                    console.log(this.Checked);
                    element["TrangThai"] = this.TrangThai;
                }
                else {
                    console.log(element.id + "-" + results);
                    this.TrangThai = 0;
                    this.Checked = results;
                    console.log(this.Checked);
                    element["TrangThai"] = this.TrangThai;
                }
            }).catch(results => {
                console.log(results);
                this.Checked = false;
            })
        });
        setTimeout(() => {
            console.log(this.Lich);
        }, 1000)

    }
    KiemTra(id) {
        //kiểm tra công việc nào đã được đặt theo id công việc
        LocalNotifications.isScheduled(id).then(results => {
            if (results == true) {
                console.log(id + "-" + results);
                this.TrangThai = 1;
            }
            else {
                console.log(id + "-" + results);
                this.TrangThai = 0;

            }
        }).catch(results => {
            console.log(results);
            this.TrangThai = 0;
        })
    }


}
