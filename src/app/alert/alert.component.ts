import { AlertService } from './../services/alert.service';




import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { 
        this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
        });
    }

    ngOnInit() {
        
    }
}