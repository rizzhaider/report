import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class AstroavailabilityService {
    private baseURL = environment.baseBZURI;
    private getAstroAvailabilityURL = this.baseURL + '/astroAvailabilityReport';
    constructor(private http: Http) { }
    
    getAstroAvailabilityReport(date: string) {
        let _getAstroAvailabilityURL = this.getAstroAvailabilityURL;
        _getAstroAvailabilityURL = _getAstroAvailabilityURL + '?date=' + date;
        console.log(_getAstroAvailabilityURL);
        return this.http.get(_getAstroAvailabilityURL)
            .map((response: Response) => {
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

    }

}
