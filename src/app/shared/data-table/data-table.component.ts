import { Component, Input, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder,FormGroup,FormControl,Validators, ReactiveFormsModule} from '@angular/forms';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit{

  @Input() data: any;
  dataSource : any;
  headerTable : any;
  selectedIndex : any;
  selectedParentIndex : any;
  selectedVariations : Array<any> = [];
  popup = false;
  overallPrice : number = 0;

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.data.record.forEach((element : any) => {
      element.list.forEach((element2 : any) => {
        element2.selectedVariation = element2.variations1;
        element2.selectedVariationPrice = element2.price1;
      });
    });
   
    this.dataSource = this.data.record;
    setTimeout(() => {
      this.updatePrice();
    }, 1000);

    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  setShow(id : any){
    //this.pop= this.pop==id ? -1 : id;
    console.log(id);
  }

  onPopupClick(i : any , m : any , flag ?: string) {
    console.log('onclick = ' + i);
    if(flag){
      this.selectedIndex = undefined;
      this.selectedParentIndex = m;
      
    }
    else{
      this.selectedIndex = i;
      this.selectedParentIndex = m;
    }
  }
  onVariationSelect(itemName : any, selectedValue : any, indexOfItem : any, parentindexOfItem : any, selectedValuePrice : any, ) {

    this.dataSource[parentindexOfItem].list[indexOfItem].selectedVariation = selectedValue;
    this.dataSource[parentindexOfItem].list[indexOfItem].selectedVariationPrice = selectedValuePrice;
    
    this.updatePrice();
  }
  onVariationSelectDropdown(selectedValue : any, indexOfItem : any, parentindexOfItem : any) {

    if(selectedValue.target.options.selectedIndex == 0){
      this.dataSource[parentindexOfItem].list[indexOfItem].selectedVariationPrice = this.dataSource[parentindexOfItem].list[indexOfItem].price1
    }
    if(selectedValue.target.options.selectedIndex == 1){
      this.dataSource[parentindexOfItem].list[indexOfItem].selectedVariationPrice = this.dataSource[parentindexOfItem].list[indexOfItem].price2
    }
    if(selectedValue.target.options.selectedIndex == 2){
      this.dataSource[parentindexOfItem].list[indexOfItem].selectedVariationPrice = this.dataSource[parentindexOfItem].list[indexOfItem].price3
    }
    this.dataSource[parentindexOfItem].list[indexOfItem].selectedVariation = selectedValue.target.value;
    this.updatePrice();
  }

  colorChange(itemName : any , value : any){
    const index = this.selectedVariations.findIndex((el) => el.name === itemName)
    if(this.selectedVariations.length >0 && this.selectedVariations[index].value == value){
     return true
    }
    else{
      return false;
    }
  }

  updatePrice() {
    console.info(this.dataSource);
    let overallCost : number = 0;
    this.dataSource.forEach((record : any) => {
      //Parent level item
      record.list.forEach((subCat : any) => {
        overallCost = overallCost + subCat.selectedVariationPrice;
      });
      this.overallPrice = overallCost;
    });
  }
  
}
