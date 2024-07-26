import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBill'
})
export class SearchBillPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    return value.filter(element => `${element.payor?.firstName} ${element.payor?.lastName}`.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
  }

}
