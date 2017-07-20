import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from 'ionic-native';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { LichCongViecPage } from '../pages/lichcongviec/lichcongviec';
import {CaiDatPage} from '../pages/caidat/caidat'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  @ViewChild('content') content: NavController

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      LocalNotifications.on("click", (notifi) => {
        alert(`${notifi.data}`);
        this.content.push(LichCongViecPage);
      });

      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });
      const options: PushOptions = {
        android: {
          senderID: '848269713610'
        }
      };
      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => this.content.push(CaiDatPage));

      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    });
  }
}

