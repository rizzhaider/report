import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class PackagesService {

  private baseURL = environment.baseBZURI;
  private getAstroPackageListURL = this.baseURL + '/astroPackagesList';
  constructor(private http :Http) { }
  getAstroPackageList(){
    let _getAstroPackageListURL = this.getAstroPackageListURL;
    console.log(_getAstroPackageListURL);
    return this.http.get(_getAstroPackageListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }

}
