import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any[], searchTerm: string, filteration: string): any[] {
        
    if (searchTerm == undefined) {
      if (filteration == "online")
        return values.filter((item) => item.type == 3)
      else if (filteration == 'offline')
        return values.filter((item) => item.type == 4);
      else
        return values;
    }

    if (filteration == "online")
      return values.filter((item) => `${item.patient.firstName} ${item.patient.lastName}`.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
        && item.type == 3)
    else if (filteration == 'offline')
      return values.filter((item) => `${item.patient.firstName} ${item.patient.lastName}`.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
        && item.type == 4);
    else
      return values.filter((item) => `${item.patient.firstName} ${item.patient.lastName}`.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()));

  }

}
