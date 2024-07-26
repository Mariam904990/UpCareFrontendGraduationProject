import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  constructor(
    private _MatDialogRef:MatDialogRef<ConfigComponent>
  ){}

  confirm(){
    this._MatDialogRef.close('confirm');
  }

  cancel(){
    this._MatDialogRef.close('cancel');
  }
}
