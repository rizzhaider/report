import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class AstroforcelogoutService {
       private baseURL = environment.baseBZURI; 
       private getAstroforcelogoutURL = this.baseURL + '/astroForceLogoutReport';
       constructor(private http: Http) {}  

    getAstroConsolidatedReport(startDate:string, endDate:string) {
        let _getAstroforcelogoutURL = this.getAstroforcelogoutURL;
        _getAstroforcelogoutURL = _getAstroforcelogoutURL + '?startDate=' + startDate + '&endDate=' + endDate ; 
        console.log(_getAstroforcelogoutURL);
        return this.http.get(_getAstroforcelogoutURL)
            .map((response: Response) => {
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

   

}
