import { EliteApi } from './../../shared/elite-api.services';
import { TeamsPage } from './../teams/teams';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(
    public navCtrl: NavController, 
    private eliteApi: EliteApi,
    private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Loading Tournaments...'
      // spinner: 'dots'
    });
  
    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    })
    
  }

  itemTapped(event, tourney){
    this.navCtrl.push(TeamsPage, tourney);
  }
}
