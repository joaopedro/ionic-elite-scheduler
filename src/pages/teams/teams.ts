import { EliteApi } from './../../shared/elite-api.services';
import { TeamHomePage } from './../team-home/team-home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as _ from "lodash";
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
  private allTeams: any;
  private allTeamsDivisions: any;
  teams = [];
  queryText: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteApi: EliteApi, 
    private loadingController: LoadingController) {
  }
  
  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Loading teams...'
    });
    loader.present().then(() => {
      this.eliteApi.getTorunamentData(selectedTourney.id).subscribe(data =>{
        this.allTeams = data.teams;
        this.allTeamsDivisions = _.chain(data.teams)
                      .groupBy('division')
                      .toPairs()
                      .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                      .value();
        this.teams = this.allTeamsDivisions;
        console.log('division teams', this.teams);
        
        loader.dismiss();
      });
    });
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];

    _.forEach(this.allTeamsDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if(teams.length){
        filteredTeams.push({divisionName: td.divisionName, divisionTeams: teams});
      }
    });

    this.teams = filteredTeams;
  }
}
