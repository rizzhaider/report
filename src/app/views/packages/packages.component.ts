import { Component, OnInit, ViewChild } from '@angular/core';
import {  Package } from './../../shared/model/packages.model';
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
  
  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }
 
  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayPackage = this.package.slice(startIndex, endIndex)
  }
  public newCatModal;
  @ViewChild('packageModal') _packageModal: any;
  public package:Package[];
  public currencyTypeSelcet:any;
  public displayPackage:Package[];
  public packageItem: Package = new Package();
  public loading:boolean = false;

  constructor(private packageService: PackagesService) { }

  ngOnInit() {
    this.getCategoriesList();
  }

  getCategoriesList(){
    this.loading = true;
    this.packageService.getAstroPackageList().subscribe(
    
        data => {
        this.loading = false;
       this.package = data.packageList;
       this.totalItems = this.package.length;
       this.currentPage = 1;
       let startIndex = (this.currentPage - 1) * this.itemsPerPage;
       let endIndex = startIndex + this.itemsPerPage;
       this.displayPackage = this.package.slice(startIndex, endIndex);
       //console.log(this.package);
        }

    )
  }

  updatePackage(Package:Package){
    
   
   
      this.packageItem = Package;
    this.saveText = "Update";
    this.headerText = "Update Package"
    console.log(this.packageItem);
    this._packageModal.show();
    
  }
  onAddPackage(){
    this.packageItem = new Package();
    this.saveText = "Save"; 
    this.headerText = "Add New Package" 
    console.log(this.packageItem);  
    this._packageModal.show();
  }
}
