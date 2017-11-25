import { Banner } from './../../shared/model/banner.model';
import { BannerType } from './../../shared/model/banner-type.model';
import { BannerService } from './../../services/banner.service';
import {  Category } from './../../shared/model/categories.model';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { NgForm } from '@angular/forms';
@Component({

  templateUrl: './banner.component.html'


})
export class BannerComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  headerText = "";
  public image_file: File;
  public filename: string = '';
  public filesize: number;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayBanner = this.bannerList.slice(startIndex, endIndex)
  }

   public newCatModal;
   @ViewChild('bannerModal') _bannerModal: any;
   public bannerList:Banner[];
   public selectedBannerTypeId:number;
   public bannerTypes:BannerType[];
   public displayBanner:Banner[];
   public bannerItem: Banner = new Banner();
   public loading:boolean = false;
  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    this.getBannerList();
  }
  public fileChange(event) {
    this.image_file = event.srcElement.files[0];
    this.filename = this.image_file.name;
    this.filesize = this.image_file.size;
  }
  getBannerList(){
    this.loading = true;
    this.bannerService.getBannerDetail().subscribe(

        data => {
        this.loading = false;
       this.bannerList = data.bannerList;
       this.bannerTypes = data.bannerTypes;
       this.totalItems = this.bannerList.length;
       this.currentPage = 1;
       let startIndex = (this.currentPage - 1) * this.itemsPerPage;
       let endIndex = startIndex + this.itemsPerPage;
       this.displayBanner = this.bannerList.slice(startIndex, endIndex);
       //console.log(this.category);
        }

    )
  }

  updateBanner(banner:Banner){
    this.bannerItem = banner;
    this.filename = '';
    this.image_file = null;
    this.filesize = undefined;
    this.selectedBannerTypeId = this.bannerItem.type;
    this.saveText = "Update";
    this.headerText = "Update Banner"
    console.log(this.bannerItem);
    this._bannerModal.show();
  }
  onAddBanner(){
    this.bannerItem = new Banner();
    this.image_file = null;
    this.filename = '';
    this.filesize = undefined;
    this.saveText = "Save";
    this.selectedBannerTypeId = 0;
    this.headerText = "Add New Banner"
    console.log(this.bannerItem);
    this._bannerModal.show();
  }


  save(form: NgForm) {
    // this.alertService.clear();
    this.createBanner(form);
  }
  validate() {
    // Image Validation
    if (this.filesize) {
      if (this.filesize > 2097152) {
        // this.alertService.error('Please select a file size less than 2 MB');
        console.log("Please select a file size less than 2 MB");
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
        // this.alertService.error('Please upload a valid image file');
        console.log("Please upload a valid image file");
        return false;
      }
    }

    return true;
  }





  createBanner(form: NgForm) {
    if (!this.validate())
      return;
    let bannerData = {
      bannerType: this.bannerItem.typeName,
      isAcitve: this.bannerItem.active,
      banneImageUrl: this.bannerItem.url,
      bannerTypeID: this.bannerItem.type,
      bannerId: this.bannerItem.id,    
      file: this.image_file
    }

    this.bannerService.createBanner(bannerData).subscribe(
      data => {
        // this.logService.debug('Received createNewNGO response', data);
        this._bannerModal.hide();
        // this.orgCreated.emit();
      },
      error => {
        // this.logService.error(error);
      });

  }

}
