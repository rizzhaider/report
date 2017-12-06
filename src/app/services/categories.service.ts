import { Category } from './../shared/model/categories.model';
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
  private createCategoryURL = this.baseURL + '/category';
  private updateCategoryURL = this.baseURL + '/categoryUpdate';
  private updateCategorylogoURL = this.baseURL + '/updateCategoryLogo';
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

   createCategory(dataObject:any){
    const formData = new FormData();
    formData.append('name', dataObject.name);
    formData.append('orderNo', dataObject.orderNo);
    formData.append('active', dataObject.active);
    formData.append('imageFile', dataObject.imageFile);
    return this.http.post(this.createCategoryURL, formData)
    .map((response: Response) => {
        let data = response.json();
        return data;
    }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }





   updatecategory(categoryDetails: Category) {
    
     let _updateCategoryURL = this.updateCategoryURL;
     _updateCategoryURL = _updateCategoryURL + '/' +  categoryDetails.id + '/' +  categoryDetails.catName + '/' + categoryDetails.orderId + '/' + categoryDetails.isActive   ; 
   
     // let options = new RequestOptions({ headers: headers });
     
     return this.http.get(_updateCategoryURL)
         .map((response: Response) => {
             let data = response.json();
             console.log("savedAtata" + ' ' + data);
             return data;
            
         }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   updateCategoryLogo(dataObject:any){
    let _updateCategorylogoURL = this.updateCategorylogoURL;
    _updateCategorylogoURL = _updateCategorylogoURL + '/' +  dataObject.id; 
  
    const formData = new FormData();    
    formData.append('imageFile', dataObject.imageFile);
    return this.http.post(_updateCategorylogoURL, formData)
    .map((response: Response) => {
        let data = response.json();
        return data;
    }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}
