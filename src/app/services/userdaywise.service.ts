import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class UserDayWiseService {
  private baseURL = environment.baseBZURI;
  private getDailyWiseURL = this.baseURL + '/userDaywiseActivity';

  constructor(private http: Http) { }

  getDailyWiseDetail(date: string){
    // let headers = new Headers ({'Cache-Control' : 'max-age=0'});
    // let options = new RequestOptions ({headers : headers});
    let _dailyWiseURL = this.getDailyWiseURL;
    _dailyWiseURL = _dailyWiseURL + '/' + date + '/' + date; 
    console.log(_dailyWiseURL);
    return this.http.get(_dailyWiseURL)
    .map((response: Response) =>{

      let data = response.json();
      console.log('ddddddd');
      return data;
      
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));

    

  }


}
