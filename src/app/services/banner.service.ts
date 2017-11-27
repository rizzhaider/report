import { Banner } from './../shared/model/banner.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class BannerService {
    private baseURL = environment.baseBZURI;
    private bannerURL = this.baseURL + '/banner';
    constructor(private http: Http) { }
    
    getBannerDetail() {
        let _getBannerURL = this.bannerURL;
       
        console.log(_getBannerURL);
        return this.http.get(_getBannerURL)
            .map((response: Response) => {
                let data = response.json();
                console.log(data);
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

    }

    createBanner(dataObject: any) {
        // let headers = new Headers({ 'cache-control': 'no-cache' });
        // headers.append('Authorization', this.userService.getUserToken());
        //headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');

       
        const formData = new FormData();
        formData.append('imageFile', dataObject.imageFile);
        formData.append('active', dataObject.active);
        formData.append('type', dataObject.type);
      
      
        // let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.bannerURL, formData)
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateBanner(bannerDetails: Banner) {
        
         let _bannerURL = this.bannerURL;
         _bannerURL = _bannerURL + '/' +  bannerDetails.id + '?active=' +  bannerDetails.active ; 
       
         // let options = new RequestOptions({ headers: headers });
         
         return this.http.get(_bannerURL)
             .map((response: Response) => {
                 let data = response.json();
                 console.log("savedAtata" + ' ' + data);
                 return data;
                
             }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
       }

}
