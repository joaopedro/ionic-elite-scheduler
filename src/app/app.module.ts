import { MapPage } from './../pages/map/map';
import { UserSettings } from './../shared/user-settings.service';
import { GamePage } from './../pages/game/game';
import { HttpModule } from '@angular/http';
import { EliteApi } from './../shared/elite-api.services';
import { StandingsPage } from './../pages/standings/standings';
import { TeamHomePage } from './../pages/team-home/team-home';
import { TeamDetailPage } from './../pages/team-detail/team-detail';
import { TeamsPage } from './../pages/teams/teams';
import { TournamentsPage } from './../pages/tournaments/tournaments';
import { MyTeamsPage } from './../pages/my-teams/my-teams';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule} from 'angular2-google-maps/core';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    TeamHomePage,
    StandingsPage,
    GamePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    TeamHomePage,
    StandingsPage,
    GamePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    UserSettings,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
