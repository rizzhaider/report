import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class AstroconsolidatedService {
    private baseURL = environment.baseBZURI;
    // private getAstroConsolidatedURL = this.baseURL + '/loggTrackReportMonth';
       private getAstroConsolidatedURL  =' http://restdev.rockstand.in/astrolive/loggTrackReportMonth';
       private getAstroReportDayURL = 'http://restdev.rockstand.in/astrolive/loggTrackReportDay'
       constructor(private http: Http) { }
    
    getAstroConsolidatedReport(year:any, month:any, astroId:any) {
        let _getAstroConsolidatedURL = this.getAstroConsolidatedURL;
        _getAstroConsolidatedURL = _getAstroConsolidatedURL + '?year=' + year + '&month=' + month + '&astroId=' + astroId ; 
        console.log(_getAstroConsolidatedURL);
        return this.http.get(_getAstroConsolidatedURL)
            .map((response: Response) => {
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

    }

    getAstroReportDay(astroId:number, sessionDate:string){

        let _getAstroReportDayURL = this.getAstroReportDayURL;
        _getAstroReportDayURL = _getAstroReportDayURL + '?astroId=' + astroId + '&sessionDate=' + sessionDate ; 
        console.log(_getAstroReportDayURL);
        return this.http.get(_getAstroReportDayURL)
            .map((response: Response) => {
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }

}
