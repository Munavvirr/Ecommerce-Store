import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy{
  categories: Array<string> | undefined 
  categoriesSubscription: Subscription | undefined
  @Output() showCategory = new EventEmitter<string>()
  
  onShowCategory(category: string): void{
    this.showCategory.emit(category)
  }

  constructor(private storeService: StoreService){}

  ngOnInit(): void{
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((response: Array<string>)=>{
      this.categories = response
    })
  }

  ngOnDestroy(): void{
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe()
    }
  }
}
