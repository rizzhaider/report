import { AlertService } from './../../services/alert.service';
import { NgForm } from '@angular/forms';
import {  Category } from './../../shared/model/categories.model';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
@Component({ 
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  totalItems = 0;
  currentPage = 0;
  smallnumPages = 0;
  itemsPerPage = 10;
  saveText = "";
  headerText = "";
  
  public readOnly:boolean;
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
    this.displayCategory = this.category.slice(startIndex, endIndex)
  }

  
   @ViewChild('f') _form: NgForm;
   @ViewChild('fLogo') _fLogo: NgForm;
   @ViewChild('categoryModal') _categoryModal: any;
   @ViewChild('updateLogoModal') _updateLogoModal: any;
   
   public category:Category[];
   public displayCategory:Category[];
   public categoryItem: Category = new Category();
   public loading:boolean = false;
  constructor(private categoriesService: CategoriesService, private alertService: AlertService) { }

  ngOnInit() {
    this.getCategoriesList();
  }
  public fileChange(event) {
    this.image_file = event.srcElement.files[0];
    this.filename = this.image_file.name;
    this.filesize = this.image_file.size;
  }
  getCategoriesList(){
    this.loading = true;
    this.categoriesService.getAstroCategoryList().subscribe(
    
        data => {
       this.loading = false;
       this.category = data.categories;
       this.totalItems = this.category.length;
       this.currentPage = 1;
       let startIndex = (this.currentPage - 1) * this.itemsPerPage;
       let endIndex = startIndex + this.itemsPerPage;
       this.displayCategory = this.category.slice(startIndex, endIndex);
       //console.log(this.category);
        }

    )
  }

  onUpdateCategory(_category:Category){  
    this.readOnly = true;  
    
    this.categoryItem = Object.assign({}, _category);
    this.filename = '';
    this.image_file = null;
    this.saveText = "Update";
    this.headerText = "Update Category"
    console.log(this.categoryItem);
    this._form.form.markAsUntouched();
    this._categoryModal.show();
  }
  onAddCategory(){
    this.readOnly = false;    
    this.categoryItem = new Category();
    this.filename = '';
    this.image_file = null;
    this.filesize = undefined;
    this.saveText = "Save"; 
    this.headerText = "Add New Category" 
    console.log(this.categoryItem);  
    document.getElementById('image_file').nodeValue = '';
    this._form.form.markAsPristine();
    this._form.form.markAsUntouched();
    this._form.form.updateValueAndValidity();
    this._categoryModal.show();
  }
  onUpdateLogo(_category:Category){
    this.readOnly = false;      
    this.categoryItem = Object.assign({}, _category);
    this.filename = '';
    this.image_file = null;
    this.filesize = undefined;
    this.saveText = "Update"; 
    this.headerText = "Add New Logo" 
    document.getElementById('image_file').nodeValue = '';
    this._fLogo.form.markAsPristine();
    this._fLogo.form.markAsUntouched();
    this._fLogo.form.updateValueAndValidity();
    this._updateLogoModal.show();
  }

  // Save/Update category
  save(form: NgForm) {
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



  createCategory(form: NgForm){
    if (!this.validate())
    return;
  let categoryData = {
    name: this.categoryItem.catName,
    orderNo: this.categoryItem.orderId,
    active: this.categoryItem.isActive,
    imageFile:this.image_file
   }

   this.categoriesService.createCategory(categoryData).subscribe(
    data => {
      if (data.success) {
        
                  this.alertService.successTimedOut("Category has been created", 3000);
                  this._categoryModal.hide();
                  this.getCategoriesList();
                } else {
                  this.alertService.errorTimedOut("Category Cannot be created at the moment", 3000);
                }
    },
    error => {
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
    if (!this.validate())
    return;
  let categoryData = {
    id:this.categoryItem.id,
    imageFile:this.image_file
   }

   this.categoriesService.updateCategoryLogo(categoryData).subscribe(
    data => {
      if (data.success) {
        
                  this.alertService.successTimedOut("Logo has been updated", 3000);
                  this._updateLogoModal.hide();
                  this.getCategoriesList();
                } else {
                  this.alertService.errorTimedOut("Logo Cannot be updated at the moment", 3000);
                }
    },
    error => {
    this.alertService.errorTimedOut(error, 3000);
    });
  }

}
