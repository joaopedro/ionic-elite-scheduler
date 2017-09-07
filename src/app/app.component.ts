import { TeamHomePage } from './../pages/team-home/team-home';
import { EliteApi } from './../shared/elite-api.services';
import { UserSettings } from './../shared/user-settings.service';
import { TournamentsPage } from './../pages/tournaments/tournaments';
import { MyTeamsPage } from './../pages/my-teams/my-teams';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html', 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

//  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private userSetthings: UserSettings,
    private eliteApi: EliteApi,
    private loadingController: LoadingController, 
    private events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.refreshFavorites();
      this.events.subscribe('favorites:changed', ()=> this.refreshFavorites());

      this.splashScreen.hide();
    });
  }

  refreshFavorites(){
    this.userSetthings.getAllFavorites().then(teams => this.favoriteTeams = teams); 
  }

  goToTeam(favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTorunamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goHome(){
    this.nav.push(MyTeamsPage);
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}
