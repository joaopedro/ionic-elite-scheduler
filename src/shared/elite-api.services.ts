import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';

import 'rxjs';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi {
    private baseUrl = 'https://elite-schedule-app-2-7e3ad.firebaseio.com/'; 
    currentTourney: any = {};

    constructor(private http: Http){ }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()))
        })
    }

    getTorunamentData(tourneyId) : Observable<any>{
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map((response: Response) => {
                this.currentTourney = response.json();
                return this.currentTourney;
            })
    }

    getCurrentTourney(){
        return this.currentTourney;
    }
}