import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectfilterpipe'
})
export class ObjectFilterPipe implements PipeTransform {

  transform(value: any, filterObj: any): any {
    
    if (value.length === 0 || filterObj == null) {
      return value;
    }

    const resultArr: any[] = [];
    for (const item of value) {
      var found = true;
      for (const prop in filterObj) {
       found =  (item[prop] === filterObj[prop]) && found;
      }
      if (found) resultArr.push(item); 
    }
    return resultArr;
  }
}
