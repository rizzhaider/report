import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class PaymentMethodService {
 
  private baseURL = environment.baseBZURI;
//   private savePackageURL = this.baseURL + '/astroPackage';
//   private updatePackageURL = this.baseURL + '/astroPackageActiveDeactive';
  private getPayementmethodsListURL = this.baseURL + '/getPaymentMethod';
  
  
  constructor(private http :Http) { }
  getPaymentmethodList(){
    let _getPayementmethodsListURL = this.getPayementmethodsListURL;
    console.log(_getPayementmethodsListURL);
    return this.http.get(_getPayementmethodsListURL)
    .map((response:Response) => {
     let data = response.json();
    console.log(data);
      return data;
    }).catch((error:any) => Observable.throw(error.json().error || 'server error'));
     
   }

//    savePackage(packageDetails: Package) {
//     const formData = new FormData();
//     formData.append('timeValidity', '' + packageDetails.timeValidity);
//     formData.append('rockMrp', '' +  packageDetails.rockMrp);
//     formData.append('emrp', '' +  packageDetails.emrp);
//     formData.append('currencyType', '' + packageDetails.currencyType);
//     formData.append('isActive', '' + packageDetails.isActive);
//     formData.append('packageType', '' + packageDetails.packageType);
    
  
//     // let options = new RequestOptions({ headers: headers });
    
//     return this.http.post(this.savePackageURL, formData)
//         .map((response: Response) => {
//             let data = response.json();
//             console.log("savedAtata" + ' ' + data);
//             return data;
           
//         }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
// }

// updatePackage(packageDetails: Package) {
 
//   let _updatePackageURL = this.updatePackageURL;
//   _updatePackageURL = _updatePackageURL + '/' +  packageDetails.id + '/' +  packageDetails.isActive ; 

//   // let options = new RequestOptions({ headers: headers });
  
//   return this.http.get(_updatePackageURL)
//       .map((response: Response) => {
//           let data = response.json();
//           console.log("savedAtata" + ' ' + data);
//           return data;
         
//       }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
// }

}
