import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMedicine'
})
export class SearchMedicinePipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    return value.filter(element => 
                  element.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
                || element.category.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
  }
}
