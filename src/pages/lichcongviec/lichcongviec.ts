import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { LocalNotifications, BackgroundMode } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';
import { CaiDatPage } from '../caidat/caidat';


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
        ThoiGian: "09:25",
        Ngay: "2017/7/20"
    }, {
        id: 2,
        NoiDung: "Lập trình hướng đối tượng",
        ThoiGian: "09:33",
        Ngay: "2017/7/20"
    }, {
        id: 3,
        NoiDung: "asp.net",
        ThoiGian: "09:14",
        Ngay: "2017/7/20"
    }, {
        id: 4,
        NoiDung: "Lên lớp C#",
        ThoiGian: "16:50",
        Ngay: "2017/7/18"
    }, {
        id: 5,
        NoiDung: "Họp",
        ThoiGian: "10:41",
        Ngay: "2017/7/18"
    }, {
        id: 6,
        NoiDung: "Họp team",
        ThoiGian: "11:01",
        Ngay: "2017/8/18"
    }, {
        id: 7,
        NoiDung: "Đá bóng",
        ThoiGian: "10:53",
        Ngay: "2017/7/18"
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
    // Checked = false;
    idNotify;
    checkTat = false;
    checkBat = false;
    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        public storage: Storage, public plt: Platform) {
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

        // this.Lich.forEach(element => {
        //     element["TrangThai"] = 0;
        // });
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
        // xóa tất cả notify đã thông báo.
        LocalNotifications.clearAll().then(results => {
            console.log("Clear all:");
            console.log(results);
        });
        this.HienThongBao("Thông Báo", "Xóa All");
        console.log("Xóa All");
    }
    //even khi nhấn giữ 1 công việc để đặt hay tắt thông báo cho công việc đó
    showSheet(id) {
        //cộng id thêm 1 dãy để tạo id notify khác nhau của id đó.
        this.idNotify = id + (15071995 * 1);
        //kiểm tra xem id này đã có thông báo chưa
        this.KiemTra(this.idNotify);
        let actionSheet;
        //lấy id của công việc đang chọn set vào Detail để sử dụng.
        this.Lich.forEach(element => {
            if (element.id == id) {
                this.Detail.id = element.id;
                this.Detail.NoiDung = element.NoiDung;
                this.Detail.ThoiGian = element.ThoiGian;
                this.Detail.Ngay = element.Ngay;
            }
        });
        //thay đổi trạng thái của công việc nếu chưa thiết lập thông báo thì trạng thái tắt, nếu đã thiết lập thì trạng thái bật.
        setTimeout(() => {
            if (this.TrangThai == 0) {
                this.checkBat = false;
                this.checkTat = true;
            }
            else {
                this.checkBat = true;
                this.checkTat = false;
            }
            //thiết lập option hiện lựa chọn
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
                    //if chọn bật thì kiểm tra trạng thái xem nếu đang bật thì không đặt đc nữa
                    if (data == "1") {
                        if (this.TrangThai == data) {
                            this.HienThongBao("Thông Báo!", "Công việc này đã được đặt trước đó!");
                        }
                        //nếu chưa thì đặt thông báo cho công việc đó.thì thiết lập đặt thông báo.
                        else {
                            this.TrangThai = 1;
                            this.DatThongBao();
                        }

                    }
                    //nếu chọn tắt.
                    if (data == "0") {
                        //nếu công việc chưa đc thiết lập thì hiện thông báo
                        if (this.TrangThai == data) {
                            this.HienThongBao("Thông Báo!", "Công việc này chưa được đặt thông báo!");
                        }
                        //nếu cv đã có thiết lập thì xóa thiết lập cho cv đó.
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
    //đặt thông báo cho công việc
    DatThongBao() {
        //tách thời gian
        this.TachThoiGian();
        //đặt notify
        this.HienNotify();
    }
    //Hiện thông báo.
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
    //tách ngày của công việc
    TachNgay() {
        this.ThangCv = this.Detail.Ngay.split('/')[1];
        this.NgayCv = this.Detail.Ngay.split('/')[2];
        console.log("ngày cv:");
        console.log(this.NgayCv);
        console.log("thang cv:");
        console.log(this.ThangCv);

    }
    //tách thời gian của công việc
    TachThoiGian() {
        //lấy thời gian của công việc tách ra để cài thời gian hẹn của notify
        this.GioCv = this.Detail.ThoiGian.split(':')[0];
        this.PhutCv = this.Detail.ThoiGian.split(':')[1];
        console.log(this.GioCv);
        console.log(this.PhutCv);

    }
    //đặt notify cho công việc
    HienNotify() {
        //lấy tgian hiện tại
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        // var hours = d.getHours();
        // var minutes = d.getMinutes();
        //tách ngày
        this.TachNgay();
        //tính số lần lặp
        this.SoLanLap = this.ThoiGianHen / this.ThoiGianLap;
        //thời gian báo.
        //nếu phút của công việc < thời gian hẹn thì ta lấy giờ cv -1 và phút = 60-(thời gian hẹn - phút cv)
        if (this.PhutCv - this.ThoiGianHen < 0) {
            this.GioCv = this.GioCv - 1;
            this.PhutCv = 60 - (this.ThoiGianHen - this.PhutCv);
        }
        //nếu phút cv > thời gian hẹn, phút cv = phút cv - thời gian hẹn
        else {
            this.PhutCv = this.PhutCv - this.ThoiGianHen;
        }
        console.log(this.GioCv + "---" + this.PhutCv);
        //tính ngày
        //nếu ngày cv > ngày hiện tại và tháng giống nhau thì ngày của thời gian báo notify = ngày công việc
        if (this.NgayCv > day && this.ThangCv == month) {
            day = this.NgayCv;
        }
        else {
            //nếu ngày giống nhau mà tháng của cv > tháng hiện tại thì tháng của notify = tháng cv
            if (this.ThangCv > month) {
                month = this.ThangCv - 1;
                day = this.NgayCv;
            }
        }
        //thời gian hẹn của notify
        var reminder = new Date(year, month, day, this.GioCv, this.PhutCv, 0);
        console.log(reminder);
        let notifi;

        this.idNotify = this.Detail.id;
        //nếu ngày cv < ngày hiện tại  không đặt thông báo được
        if (this.NgayCv < day) {
            this.HienThongBao("Thông Báo!", "Công việc đã qua không thể đặt thông báo!")
        }
        else {
            // nếu thời gian hẹn của notify < thời gian hiện tại hiện thông báo
            if (d > reminder) {
                this.HienThongBao("Thông Báo!", "Công việc đã qua không thể đặt thông báo!");
            }
            else {
                // theo số lần lặp đặt thông báo.
                for (let i = 0; i < this.SoLanLap + 1; i++) {
                    //nếu lặp lần thứ 2 thì ta lấy số phút notify cộng thêm 1 khoảng thời gian lặp
                    if (i > 0) {
                        this.PhutCv = (this.PhutCv + this.ThoiGianLap * 1);
                    }
                    //set lại id cho notify cộng thêm 1 chuổi để id khác nhau
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
                        data:this.Detail.id,
                        icon: "file://assets/img/clock1.png"
                    };
                    //set notify
                    LocalNotifications.schedule(notifi);
                    console.log(notifi);

                    // LocalNotifications.on("click", function (notifi) {
                    //     document.addEventListener("deviceready", function () {
                    //         alert("ID: " + notifi.id);
                    //         return;
                    //     }, false)

                    // });
                   
                    // document.addEventListener("deviceready", function () {
                    //     LocalNotifications.on("click", function (notifi) {
                    //         alert("ID: " + notifi.id);
                    //         return;
                    //     });
                    // }, false)

                    //set background
                    BackgroundMode.enable();
                }
                //  this.plt.ready().then(() => {
                //         LocalNotifications.on("click", (notifi) => {
                //             console.log(notifi.id);
                //             console.log(this.Detail.id + 15071995 * 1);
                //             this.navCtrl.push(CaiDatPage);
                //             console.log("click" + notifi.id);
                //             return;

                //         })
                //     })
                this.HienThongBao("Thông Báo", "Đã hẹn giờ!");
            }
        }


    }
    //xóa notify theo id của công viêc đc chọn
    XoaTb() {
        this.idNotify = this.Detail.id;
        // lấy id đc chọn cộng thêm chuổi mặc đinh để xóa tất cả notify của công việc đó.
        for (let i = 0; i < 30; i++) {
            this.idNotify = this.idNotify + (15071995 * 1);
            console.log(this.idNotify);
            //xóa notify
            LocalNotifications.cancel(this.idNotify).then(results => {
                console.log("Cancel:");
                console.log(results);

            });
            //xóa notify
            LocalNotifications.clear(this.idNotify).then(results => {
                console.log("Clear:");
                console.log(results);

            })
        }

        setTimeout(() => {
            this.HienThongBao("Thông Báo", "Đã xóa đặt giờ !");
        }, 300)
    }
    //kiểm tra công việc xem đã đặt thông báo chưa theo id 
    KiemTra(id) {
        //kiểm tra công việc nào đã được đặt theo id công việc, chuyển trạng thái lại =1 nếu đã đc đặt =0 nếu chưa
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
