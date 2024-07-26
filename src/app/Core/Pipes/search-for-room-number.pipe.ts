import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchForRoomNumber'
})
export class SearchForRoomNumberPipe implements PipeTransform {

  transform(value: any[], roomNumber:number): any[] {
    if(roomNumber == 0 || roomNumber == undefined)
      return value;
    
    return value.filter(item => item.id == roomNumber)

  }

}
