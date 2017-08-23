import { EliteApi } from './../../shared/elite-api.services';
import { TeamHomePage } from './../team-home/team-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams = [];
  // teams = [
  //   {id: 1, name: 'HC Elite'},
  //   {id: 2, name: 'Team Takeover'},
  //   {id: 3, name: 'DC Thunder'}
  // ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteApi: EliteApi, 
    private loadingController: LoadingController) {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Loading teams...'
    });
    loader.present().then(() => {
      this.eliteApi.getTorunamentData(selectedTourney.id).subscribe(data =>{
        this.teams = data.teams;
        loader.dismiss();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
