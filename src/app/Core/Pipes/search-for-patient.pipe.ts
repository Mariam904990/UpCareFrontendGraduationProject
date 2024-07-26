import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchForPatient'
})
export class SearchForPatientPipe implements PipeTransform {

  transform(value: any[], searchTerm:string): any[] {
    if(searchTerm == '' || searchTerm == undefined)
      return value
    
    return value.filter((item) => `${item.firstName} ${item.lastName}`.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
  }

}
