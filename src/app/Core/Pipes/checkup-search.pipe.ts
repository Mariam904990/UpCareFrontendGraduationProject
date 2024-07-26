import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkupSearch'
})
export class CheckupSearchPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    return value.filter(element => element?.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
  }

}
