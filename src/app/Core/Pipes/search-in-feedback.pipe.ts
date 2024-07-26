import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInFeedback'
})
export class SearchInFeedbackPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    return value.filter(element => `${element?.patient?.firstName} ${element?.patient?.lastName}`.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
  }

}
