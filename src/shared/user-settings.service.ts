import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import {  Events } from 'ionic-angular';

import * as _ from 'lodash';

@Injectable()
export class UserSettings {
    storage = new Storage({});

    constructor(private events: Events){}

    favoriteTeam(team, tournamentId, tournamentName){
        let item = {
            team: team,
            tournamentId: tournamentId,
            tournamentName: tournamentName
        }

        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish('favorites:changed');
    }

    unfavoriteTeam(team){
        this.storage.remove(team.id);
        this.events.publish('favorites:changed');
    }
    
    isFavoriteTeam(teamId){
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getAllFavorites(){
        let items = [];
        return this.storage.forEach( (v,k,i) => {
            items.push(JSON.parse(v));
        }).then(() => items.length ? items : null);
    }
}