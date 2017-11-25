import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
@Injectable()
export class BannerService {
    private baseURL = environment.baseBZURI;
    private getBannerURL = this.baseURL + '/banner';
    constructor(private http: Http) { }
    
    getBannerDetail() {
        let _getBannerURL = this.getBannerURL;
       
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
        formData.append('bannerType', dataObject.bannerType);
        formData.append('isAcitve', dataObject.isAcitve);
        formData.append('banneImageUrl', dataObject.banneImageUrl);
        formData.append('bannerTypeID', dataObject.bannerTypeID);
        formData.append('bannerId', dataObject.bannerId);
        formData.append('file', dataObject.file);
      
        // let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.getBannerURL, formData)
            .map((response: Response) => {
                let data = response;;
                return data;
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
