import { ObjectFilterPipe } from './../../shared/pipes/object-filter.pipe';
import { AlertService } from './../../services/alert.service';
import { Banner } from './../../shared/model/banner.model';
import { BannerType } from './../../shared/model/banner-type.model';
import { BannerService } from './../../services/banner.service';
import {  Category } from './../../shared/model/categories.model';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { NgForm } from '@angular/forms';
@Component({

  templateUrl: './banner.component.html',
  providers: [ObjectFilterPipe]

})
export class BannerComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  savingText = "";
  headerText = "";
  public image_file: File;
  public filename: string = '';
  public filesize: number;
  public readOnly: boolean;

  public selectedBannerType = 0;
  public selectedStatus:boolean = null;
   
   @ViewChild('f') _form: NgForm;
   @ViewChild('bannerModal') _bannerModal: any;
   
   public allBanners:Banner[];
   public filteredBanner: Banner[];
   public selectedBannerTypeId:number;
   public bannerTypes:BannerType[];
   public displayBanner:Banner[];
   public bannerItem: Banner = new Banner();
   public loading:boolean = false;
   public filterObj = null;
  constructor(private bannerService: BannerService, private alertService: AlertService,
              private filterPipe:ObjectFilterPipe) { }

  ngOnInit() {
    this.getBannerList();
  }
  public fileChange(event) {
    this.image_file = event.srcElement.files[0];
    this.filename = this.image_file.name;
    this.filesize = this.image_file.size;
  }
  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayBanner = this.filteredBanner.slice(startIndex, endIndex)
  }
  getBannerList(){
    this.loading = true;
    this.bannerService.getBannerDetail().subscribe(
        data => {
       this.loading = false;
       this.allBanners = data.bannerList;
       this.filteredBanner = this.filterPipe.transform(this.allBanners, this.filterObj); 
       this.bannerTypes = data.bannerTypes;
       this.totalItems = this.filteredBanner.length;
       this.currentPage = 1;
       let startIndex = (this.currentPage - 1) * this.itemsPerPage;
       let endIndex = startIndex + this.itemsPerPage;
       this.displayBanner = this.filteredBanner.slice(startIndex, endIndex);
       //console.log(this.category);
        }

    )
  }
  
  OnUpdateBanner(_banner:Banner){
    this.readOnly = true;
    this.bannerItem = Object.assign({}, _banner);
    this.filename = '';
    this.image_file = null;
    this.filesize = undefined;
    // this.selectedBannerTypeId = this.bannerItem.type;
    this.saveText = "Update";
    this.savingText = "Udating..."
    this.headerText = "Update Banner"
    console.log(this.bannerItem); 
    // document.getElementById('image_file').nodeValue = '';   
    // this._form.form.markAsPristine();
    this._form.form.markAsUntouched();
    // this._form.form.updateValueAndValidity();

    this._bannerModal.show();
  }
  onAddBanner(){
    this.readOnly = false;
    this.bannerItem = new Banner();
    this.bannerItem.type = null;
    this.image_file = null;
    this.filename = '';
    this.filesize = undefined;
    this.saveText = "Save";
    this.savingText = "Saving..."
    // this.selectedBannerTypeId = 0;
    this.headerText = "Add New Banner"
    console.log(this.bannerItem);
    document.getElementById('image_file').nodeValue = '';
    this._form.form.markAsPristine();
    this._form.form.markAsUntouched();
    this._form.form.updateValueAndValidity();
    this._bannerModal.show();
  }

  save(form: NgForm) {
    if (this.bannerItem.id) {
      this.updateBanner(form);
    } else {
      this.createBanner(form);
    }



  }

  validate() {
    // Image Validation

    if(this.image_file == null){
      this.alertService.errorTimedOut('Please select a image to upload', 3000);
      return false;
    }
    if (this.filesize) {
      if (this.filesize > 2097152) {
        this.alertService.successTimedOut('Please select a file size less than 2 MB', 3000);
        // console.log("Please select a file size less than 2 MB");
        return false;
      }
    }

    if (this.filename) {
      var Extension = this.filename.substring(
        this.filename.lastIndexOf('.') + 1).toLowerCase();

      //The file uploaded is an image

      if (Extension == "gif" || Extension == "png" || Extension == "bmp"
        || Extension == "jpeg" || Extension == "jpg") {

      } else {
        this.alertService.errorTimedOut('Please upload a valid image file', 3000);
        console.log("Please upload a valid image file");
        return false;
      }
    }

    return true;
  }


  createBanner(form: NgForm) {
    this.loading = true;
    if (!this.validate())
      return;
    let bannerData = {
      type: this.bannerItem.type,
      active: this.bannerItem.active,
      imageFile: this.image_file
     }

    this.bannerService.createBanner(bannerData).subscribe(
      data => {
        if (data.success) {
                    this.loading = false;
                    this.alertService.successTimedOut("Banner has been added", 3000);
                    this._bannerModal.hide();
                    this.getBannerList();
                  } else {
                    this.alertService.errorTimedOut("Banner Cannot be added at the moment", 3000);
                  }
      },
      error => {
      this.loading = false;
      this.alertService.errorTimedOut(error, 3000);
      });

  }


  updateBanner(form: NgForm) {

    this.loading = true;
    // if (!this.validate())
    // return;
    this.bannerService.updateBanner(this.bannerItem).subscribe(

      data => {

        if (data.success) {
          this.loading = false;
          this.alertService.successTimedOut("Package has been updated", 3000);
          this._bannerModal.hide();
          this.getBannerList();
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

    if (this.selectedBannerType == 0 && this.selectedStatus == null) {
      this.filterObj = null;
    } else {
      this.filterObj = {};
      if (this.selectedBannerType != 0) {
        this.filterObj.type = this.selectedBannerType;
      }
      
      if (this.selectedStatus != null) {
        this.filterObj.active = this.selectedStatus;
      }

    }

    this.filteredBanner = this.filterPipe.transform(this.allBanners, this.filterObj);    
    this.totalItems = this.filteredBanner.length;
    this.currentPage = 1;
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayBanner = this.filteredBanner.slice(startIndex, endIndex);
  }

  
}
