import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';

import 'rxjs';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi {
    private baseUrl = 'https://elite-schedule-app-2-7e3ad.firebaseio.com/'; 
    currentTourney: any = {};
    private tourneyData = {};
    constructor(private http: Http){ }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()))
        })
    }

    getTorunamentData(tourneyId, forceRefresh: Boolean = false) : Observable<any>{
        if(!forceRefresh && this.tourneyData[tourneyId]){
            this.currentTourney = this.tourneyData[tourneyId];
            console.log('**No need to make an HTTP call, just return the data.');
            return Observable.of(this.currentTourney);
            
        }

        //Don't have the data yet
        console.log('**About to make an HHTP call.');
        
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map((response: Response) => {
                this.tourneyData[tourneyId] = response.json();
                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            })
    }

    getCurrentTourney(){
        return this.currentTourney;
    }

    refreshCurrentTourney(){
        return this.getTorunamentData(this.currentTourney.tournament.id, true);
    }
}