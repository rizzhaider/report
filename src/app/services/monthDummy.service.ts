import { DummyService } from './dummy.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';



interface DummyMonth {
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class DummymonthSErvice implements Resolve<DummyMonth> {
    constructor(private dummyService: DummyService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DummyMonth> | Promise<DummyMonth> | DummyMonth {
        return this.dummyService.getServer(+route.params['id']);
    }
}
