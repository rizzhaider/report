import { ObjectFilterPipe } from './../../shared/pipes/object-filter.pipe';
import { ParentList } from './../../shared/model/parentList-caregory.model';
import { AlertService } from './../../services/alert.service';
import { NgForm } from '@angular/forms';
import {  Category } from './../../shared/model/categories.model';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
@Component({ 
  templateUrl: './categories.component.html',
  providers: [ObjectFilterPipe]
})
export class CategoriesComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  headerText = "";
  savingText = "";
  
  public noImage:boolean;
  public image_file: File;
  //public Logo_file:File;
  public filename: string = '';
  public filesize: number;

  public selectedParnetId = 0;
  public selectedStatus:boolean = null;
  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }
 
 

  
   @ViewChild('f') _form: NgForm;
   @ViewChild('fLogo') _fLogo: NgForm;
   @ViewChild('categoryModal') _categoryModal: any;
   @ViewChild('updateLogoModal') _updateLogoModal: any;
   
   public allCategory:Category[];   ;
   public filteredCategory: Category[];
   public displayCategory:Category[];
   public categoryItem: Category = new Category();
   public parenLists:ParentList[];
   public loading:boolean = false;
   public filterObj = null;
   constructor(private categoriesService: CategoriesService, private alertService: AlertService, private filterPipe:ObjectFilterPipe) { }

  ngOnInit() {
    this.getCategoriesList();
    
  }
  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    let startIndex = (event.page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.displayCategory = this.filteredCategory.slice(startIndex, endIndex)
  }
  public fileChange(event) {    
    this.image_file = event.srcElement.files[0];
    this.filename = this.image_file.name;
    this.filesize = this.image_file.size;
  }
  // public logoFileChange(event) {
  //   this.Logo_file = event.srcElement.files[0];
  //   this.filename = this.Logo_file.name;
  //   this.filesize = this.Logo_file.size;
  // }
  getCategoriesList(){
    this.loading = true;
    this.categoriesService.getAstroCategoryList().subscribe(
        data => {
       this.loading = false;
       this.allCategory = data.categories;
       this.filteredCategory = this.filterPipe.transform(this.allCategory, this.filterObj); 
       this.parenLists = data.parentList;
       this.totalItems = this.filteredCategory.length;
       this.currentPage = 1;
       let startIndex = (this.currentPage - 1) * this.itemsPerPage;
       let endIndex = startIndex + this.itemsPerPage;
       this.displayCategory = this.filteredCategory.slice(startIndex, endIndex);
       //console.log(this.category);
        }

    )
  }

  
  onAddCategory(){
    this.noImage = false;   
    this.categoryItem = new Category();
    this.categoryItem.parentId = null;
    console.log('fff' + this.categoryItem.parentId);
    this.filesize = undefined;
    this.filename = ''; 
    this.image_file = null;
    document.getElementById('image_file').nodeValue = ''; 
    this._form.form.reset();
    this._form.form.markAsPristine();
    this._form.form.markAsUntouched();
    this._form.form.updateValueAndValidity();    
    this.saveText = "Save"; 
    this.savingText = "Saving..."
    this.headerText = "Add New Category" 
    console.log(this.categoryItem);
    this._categoryModal.show();
  }

 

  onUpdateCategory(_category:Category){ 
       
       
        this.noImage = true;          
        this.categoryItem = Object.assign({}, _category);
        console.log('fff' + this.categoryItem.parentId);
        if (this.categoryItem.parentId == 0) {
          this.categoryItem.parentId = null;
        }
        this.filename = '';
        
        this.filesize = undefined;
        this.image_file = null;
        this.saveText = "Update";
        this.savingText = "Updating..."
        this.headerText = "Update Category"
       
        this._form.form.markAsUntouched();
        document.getElementById('image_file').nodeValue = '';
        this._categoryModal.show();
      }



    

  onUpdateLogo(_category:Category){
    this.noImage = false;      
    this.categoryItem = Object.assign({}, _category);
    this.filename = '';
    this.image_file = null;
    this.filesize = undefined;
    this.saveText = "Update"; 
    this.savingText = "Updating..."
    this.headerText = "Add New Logo" 
    document.getElementById('Logo_file').nodeValue = '';
    this._fLogo.form.markAsPristine();
    this._fLogo.form.markAsUntouched();
    this._fLogo.form.updateValueAndValidity();
    this._updateLogoModal.show();
  }

  // Save/Update category
  save(form: NgForm) {
    if(!this.categoryItem.parentId){
      this.categoryItem.parentId = 0;
    }
    if (this.categoryItem.id){
      
      this.updateCategory(form);      
    } 
    else {
      
      this.createCategory(form);
    }
  }

// Save/Update Logo
  saveLogo(form: NgForm){
    this.updateCategoryLogo(form);
  }

  validate() {
    // Image Validation

    if(this.image_file == null){
      this.alertService.errorTimedOut('Please select a image to upload', 3000);
      this.loading = false;
      return false;
      
    }
   
    if (this.filesize) {
      if (this.filesize > 2097152) {
        this.alertService.successTimedOut('Please select a file size less than 2 MB', 3000);
        this.loading = false;
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



  createCategory(form: NgForm){
    this.loading = true;
    if (!this.validate())
    return;
   
  let categoryData = {
     
    name:this.categoryItem.catName,
    orderNo:this.categoryItem.orderId,
    active:this.categoryItem.isActive,    
    parentId:this.categoryItem.parentId,
    imageFile:this.image_file    
   
   }

   this.categoriesService.createCategory(categoryData).subscribe(
    data => {
      if (data.success) {
        this.loading = false;
        
                  this.alertService.successTimedOut("Category has been created", 3000);
                  this._categoryModal.hide();
                  this.getCategoriesList();
                } else {
                  this.loading = false;
                  this.alertService.errorTimedOut("Category Cannot be created at the moment", 3000);
                }
    },
    error => {
      this.loading = false;
    this.alertService.errorTimedOut(error, 3000);
    });
  }
  


  updateCategory(form: NgForm) {
    this.loading = true;
    // if (!this.validate())
    // return;
    this.categoriesService.updatecategory(this.categoryItem).subscribe(

      data => {

        if (data.success) {
          this.alertService.successTimedOut("Category has been updated", 3000);
          this._categoryModal.hide();
          this.getCategoriesList();
        } else {
          this.alertService.errorTimedOut("Category Cannot be updated at the moment", 3000);
        }
        this.loading = false;
        console.log(data);
      },
      error => {
        this.alertService.errorTimedOut(error, 3000);
        this.loading = false;

      });

  }



  updateCategoryLogo(form: NgForm){
    this.loading = true;
    if (!this.validate())
    return;
  let categoryData = {
    id:this.categoryItem.id,
    image_file:this.image_file
   }

   this.categoriesService.updateCategoryLogo(categoryData).subscribe(
    data => {
      if (data.success) {
                  this.loading = false;
                  this.alertService.successTimedOut("Logo has been updated", 3000);
                  this._updateLogoModal.hide();
                  this.getCategoriesList();
                } else {
                  this.loading = false;
                  this.alertService.errorTimedOut("Logo Cannot be updated at the moment", 3000);
                }
    },
    error => {
    this.loading = false;
    this.alertService.errorTimedOut(error, 3000);
    });
  }



 
  onChange(){
    
        if (this.selectedParnetId == 0 && this.selectedStatus == null) {
          this.filterObj = null;
        } else {
          this.filterObj = {};
          if (this.selectedParnetId != 0) {
            this.filterObj.parentId = this.selectedParnetId;
          }
          
          if (this.selectedStatus != null) {
            this.filterObj.isActive = this.selectedStatus;
          }
    
        }
    
        this.filteredCategory = this.filterPipe.transform(this.allCategory, this.filterObj);    
        this.totalItems = this.filteredCategory.length;
        this.currentPage = 1;
        let startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        this.displayCategory = this.filteredCategory.slice(startIndex, endIndex);
      }


}
