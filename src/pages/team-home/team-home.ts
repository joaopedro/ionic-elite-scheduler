import { StandingsPage } from './../standings/standings';
import { TeamDetailPage } from './../team-detail/team-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamHomePage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html'
})
export class TeamHomePage {
  team: any;

  teamDetailsRoot = TeamDetailPage
  standingsRoot = StandingsPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  goHome(){
    this.navCtrl.popToRoot();
  }

}
