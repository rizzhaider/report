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


})
export class PackagesComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;

  saveText = "";
  headerText = "";

  public readOnly: boolean;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayPackage = this.package.slice(startIndex, endIndex)
  }

  @ViewChild('packageModal') _packageModal: any;

  public package: Package[];
  public currencyTypes: CurrencyType[];
  public packageTypes: PackageType[];
  public displayPackage: Package[];

  public packageItem: Package = new Package();
  public loading: boolean = false;

  constructor(private packageService: PackagesService, private alertService: AlertService) { }

  ngOnInit() {
    this.getPackagesList();
  }

  getPackagesList() {
    this.loading = true;
    this.packageService.getAstroPackageList().subscribe(

      data => {
        this.loading = false;
        this.package = data.packageList;
        this.currencyTypes = data.currencyTypes;
        this.packageTypes = data.packageTypes;
        this.totalItems = this.package.length;
        this.currentPage = 1;
        let startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        this.displayPackage = this.package.slice(startIndex, endIndex);

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
    this.saveText = "Save";
    this.headerText = "Add New Package";
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
        this.alertService.error(error);
        this.loading = false;

      });

  }

}
