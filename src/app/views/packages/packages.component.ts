import { ObjectFilterPipe } from './../../shared/pipes/object-filter.pipe';
import { AlertService } from './../../services/alert.service';
import { NgForm } from '@angular/forms';
import { PackageType } from './../../shared/model/package-type.model';
import { CurrencyType } from './../../shared/model/currency-type.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Package } from './../../shared/model/packages.model';
import { PackagesService } from './../../services/packages.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
@Component({

  templateUrl: './packages.component.html',
  providers: [ObjectFilterPipe]


})
export class PackagesComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;

  saveText = "";
  headerText = "";

  public readOnly: boolean;
  public selectedPackageType = 0;
  public selectedCurrencyType = 0;
  public selectedStatus:boolean = null;
  

  @ViewChild('packageModal') _packageModal: any;
  @ViewChild('f') _form: NgForm;
  public allPackages: Package[];
  public filteredPackages: Package[];
  public currencyTypes: CurrencyType[];
  public packageTypes: PackageType[];
  public displayPackages: Package[];

  public packageItem: Package = new Package();
  public loading: boolean = false;

  public filterObj = null;

  constructor(private packageService: PackagesService, 
    private alertService: AlertService,
    private filterPipe: ObjectFilterPipe) { 

  }

  ngOnInit() {
    this.getPackagesList();
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayPackages = this.filteredPackages.slice(startIndex, endIndex)
  }

  getPackagesList() {
    this.loading = true;
    this.packageService.getAstroPackageList().subscribe(

      data => {
        this.loading = false;
        this.allPackages = data.packageList;
        this.filteredPackages = this.filterPipe.transform(this.allPackages, this.filterObj); 
        this.currencyTypes = data.currencyTypes;
        this.packageTypes = data.packageTypes;
        this.totalItems = this.filteredPackages.length;
        this.currentPage = 1;
        let startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        this.displayPackages = this.filteredPackages.slice(startIndex, endIndex);

      }

    )
  }

  onUpdatePackage(_package: Package) {
    this.readOnly = true;
    this.packageItem = Object.assign({}, _package);
    this.saveText = "Update";
    this.headerText = "Update Package"
    this._packageModal.show();

  }
  onAddPackage() {
    this.readOnly = false;
    this.packageItem = new Package();
    this.packageItem.currencyType = null;
    this.packageItem.packageType = null;
    this.saveText = "Save";
    this.headerText = "Add New Package";
    this._form.form.markAsPristine();
    this._form.form.markAsUntouched();
    this._form.form.updateValueAndValidity();

    this._packageModal.show();
  }


  save(form: NgForm) {
    if (this.packageItem.id) {
      this.updatePackage(form);
    } else {
      this.createPackage(form);
    }



  }

  createPackage(form: NgForm) {
    this.loading = true;
    this.packageService.savePackage(this.packageItem).subscribe(

      data => {

        if (data.success) {

          this.alertService.successTimedOut("Package has been added", 3000);
          this._packageModal.hide();
          this.getPackagesList();
        } else {
          this.alertService.errorTimedOut("Package Cannot be added at the moment", 3000);
        }
        this.loading = false;

      },
      error => {
        this.alertService.error(error);
        this.loading = false;

      });

  }


  updatePackage(form: NgForm) {
    this.loading = true;
    // if (!this.validate())
    // return;


    this.packageService.updatePackage(this.packageItem).subscribe(

      data => {

        if (data.success) {

          this.alertService.successTimedOut("Package has been updated", 3000);
          this._packageModal.hide();
          this.getPackagesList();
        } else {
          this.alertService.errorTimedOut("Package Cannot be updated at the moment", 3000);
        }
        this.loading = false;
        console.log(data);
      },
      error => {
        this.alertService.errorTimedOut(error, 3000);
        this.loading = false;

      });

  }
  onChange(){
    // console.log(this.selectedPackageType);
    // console.log(this.selectedCurrencyType);
    // console.log(this.selectedStatus);

    if (this.selectedPackageType == 0 && this.selectedCurrencyType == 0 && this.selectedStatus == null) {
      this.filterObj = null;
    } else {
      this.filterObj = {};
      if (this.selectedPackageType != 0) {
        this.filterObj.packageType = this.selectedPackageType;
      }
      if (this.selectedCurrencyType != 0) {
        this.filterObj.currencyType = this.selectedCurrencyType;
      }
      if (this.selectedStatus != null) {
        this.filterObj.isActive = this.selectedStatus;
      }

    }
    this.filteredPackages = this.filterPipe.transform(this.allPackages, this.filterObj); 
    this.totalItems = this.filteredPackages.length;
    this.currentPage = 1;
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayPackages = this.filteredPackages.slice(startIndex, endIndex);



  }

}
