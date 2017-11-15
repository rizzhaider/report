import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class CategoriesService {
  private baseURL = environment.baseBZURI;
  private getAstroCategoryListURL = this.baseURL + '/astroCategoriesList';
  constructor(private http :Http) { }
   getAstroCategoryList(){
    let _getAstroCategoryListURL = this.getAstroCategoryListURL;
    console.log(_getAstroCategoryListURL);
    return this.http.get(_getAstroCategoryListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }
}
