import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timedurationpipe'
})
export class TimeDurationPipe implements PipeTransform {

  transform(value: any) {
        var h = Math.floor(value / 3600);
        var m = Math.floor(value % 3600 / 60);
        var s = Math.floor(value % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
        return hDisplay + mDisplay + sDisplay; 
    
    
    }

    
}
