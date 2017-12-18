import { PaymentMethodService } from './../../../services/paymentmethods.service';

import { PaymentMethod } from './../../../shared/model/paymentmethods.model';

import { CurrencyType } from './../../../shared/model/currency-type.model';
import { AlertService } from './../../../services/alert.service';
import { ObjectFilterPipe } from './../../../shared/pipes/object-filter.pipe';

import { NgForm } from '@angular/forms';

import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
@Component({

  templateUrl: 'paymentmethod.component.html',
  providers: [ObjectFilterPipe]


})
export class PaymentmethodComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  savingText = "";
  headerText = "";
  public readOnly: boolean;
  public selectedCurrencyType = 0;
  public selectedAstroLiveStatus:boolean = null;
  

  @ViewChild('paymentmethodModal') _paymentmethodModal: any;
  @ViewChild('f') _form: NgForm;
  public allPaymentmethods: PaymentMethod[];
  public filteredPaymentmethods: PaymentMethod[];
  public currencyTypes: CurrencyType[]; 
  public displayPaymentmethods: PaymentMethod[];
  public paymentmethodItem: PaymentMethod = new PaymentMethod();
  public loading: boolean = false;
  public filterObj = null;
  constructor(private paymentmethodService: PaymentMethodService, 
    private alertService: AlertService,
    private filterPipe: ObjectFilterPipe) { 

  }

  ngOnInit() {
    this.getPaymentmethodLists();
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayPaymentmethods = this.filteredPaymentmethods.slice(startIndex, endIndex)
  }

  getPaymentmethodLists() {
    this.loading = true;
    this.paymentmethodService.getPaymentmethodList().subscribe(

      data => {
        this.loading = false;
        this.allPaymentmethods = data.paymentmethodlist;
        this.filteredPaymentmethods = this.filterPipe.transform(this.allPaymentmethods, this.filterObj); 
        this.currencyTypes = data.currencyTypes;        
        this.totalItems = this.filteredPaymentmethods.length;
        this.currentPage = 1;
        let startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        this.displayPaymentmethods = this.filteredPaymentmethods.slice(startIndex, endIndex);

      }, error => {
        this.loading = false;
        this.alertService.errorTimedOut('something went wrong!', 3000);
       

      }

    )
  }

  onUpdatePaymentmethod(_pymentmethod: PaymentMethod) {
    this.readOnly = true;
    this.paymentmethodItem = Object.assign({}, _pymentmethod);
    this.saveText = "Update";
    this.savingText = "Updating...";
    this.headerText = "Update Payment Method";
    this._form.form.markAsPristine();
    this._form.form.markAsUntouched();
    this._form.form.updateValueAndValidity();
    this._paymentmethodModal.show();

  }
  // onAddPaymentmethod() {
  //   this.readOnly = false;
  //   this.paymentmethodItem = new PaymentMethod();
  //   this.paymentmethodItem.currencyType = null;    
  //   this.saveText = "Save";
  //   this.savingText = "Saving..."
  //   this.headerText = "Add New Payment Method";
  //   this._form.form.markAsPristine();
  //   this._form.form.markAsUntouched();
  //   this._form.form.updateValueAndValidity();
  //   this._paymentmethodModal.show();
  // }


  // save(form: NgForm) {
  //   if (this.packageItem.id) {
  //     this.updatePackage(form);
  //   } else {
  //     this.createPackage(form);
  //   }
  // }

  // createPackage(form: NgForm) {
  //   this.loading = true;
  //   this.paymentmethodService.savePackage(this.packageItem).subscribe(

  //     data => {

  //       if (data.success) {
  //         this.loading = false;
  //         this.alertService.successTimedOut("Package has been added", 3000);
  //         this._paymentmethodModal.hide();
  //         this.getPackagesList();
  //       } else {
  //         this.loading = false;
  //         this.alertService.errorTimedOut("Package Cannot be added at the moment", 3000);
  //       }
       

  //     },
  //     error => {
  //       this.loading = false;
  //       this.alertService.error(error);
        

  //     });

  // }


  // updatePackage(form: NgForm) {
  //   this.loading = true;
  //   // if (!this.validate())
  //   // return;


  //   this.packageService.updatePackage(this.packageItem).subscribe(

  //     data => {

  //       if (data.success) {
  //         this.loading = false;
  //         this.alertService.successTimedOut("Package has been updated", 3000);
  //         this._paymentmethodModal.hide();
  //         this.getPackagesList();
  //       } else {
  //         this.loading = false;
  //         this.alertService.errorTimedOut("Package Cannot be updated at the moment", 3000);
  //       }
       
  //     },
  //     error => {
  //       this.loading = false;
  //       this.alertService.errorTimedOut(error, 3000);
       

  //     });

  // }
  onChange(){
    // console.log(this.selectedPackageType);
    // console.log(this.selectedCurrencyType);
    // console.log(this.selectedStatus);

    if (this.selectedCurrencyType == 0 && this.selectedAstroLiveStatus == null) {
      this.filterObj = null;
    } else {
      this.filterObj = {};
     
      if (this.selectedCurrencyType != 0) {
        this.filterObj.currencyType = this.selectedCurrencyType;
      }
      if (this.selectedAstroLiveStatus != null) {
        this.filterObj.isAstroLive = this.selectedAstroLiveStatus;
      }

    }

    this.filteredPaymentmethods = this.filterPipe.transform(this.allPaymentmethods, this.filterObj);           
    this.totalItems = this.filteredPaymentmethods.length;
    this.currentPage = 1;
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayPaymentmethods = this.filteredPaymentmethods.slice(startIndex, endIndex);
  }

}
