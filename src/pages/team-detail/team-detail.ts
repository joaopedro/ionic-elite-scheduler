import { GamePage } from './../game/game';
import { EliteApi } from './../../shared/elite-api.services';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';
/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any = {};
  private tourneyData: any;
  teamStandings: any = {};
  useDateFilter: any;
  private isFollowing = false;

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteApi: EliteApi) {}
  
  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map( g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);

                    return{
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? 'vs' : 'at')
                    };
                  })
                  .value();
    this.allGames = this.games;
    this.teamStandings = _.find(this.tourneyData.standings, {'teamId': this.team.id});   
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score){
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";

      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return '';
    }
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);

    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }
  dateChanged(){
    if(this.useDateFilter && this.dateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }else{
      this.games = this.allGames;
    }
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              //TODO: persiste data here.
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    }else{
      this.isFollowing = true;
      //TODO: Add logic to persist later
    }
    
  }
}
