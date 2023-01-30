import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { TranslateService } from '@ngx-translate/core'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as moment from 'moment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss'],
})
export class SessionCardComponent implements OnInit {
  @Input() cardData: any;
  @Input() status: any;
  buttonConfig:any;
  userData: any;
  @Input() isCreator: any
  constructor(private localStorage:LocalStorageService,private translate: TranslateService, private router: Router) { }
  @Output() buttonClick = new EventEmitter()

  async ngOnInit() {
    this.setButtonConfig(this.isCreator)
  }
  setButtonConfig(isCreator: boolean) {
    if (isCreator) {
      this.buttonConfig = { label: 'START', type: 'startAction' }
    } else {
      this.buttonConfig =
        (!isCreator && this.cardData.isEnrolled) ||
        (!isCreator && this.cardData.sessionId)
          ? { label: 'JOIN', type: 'joinAction' }
          : { label: 'ENROLL', type: 'enrollAction' }
    }
    let currentTimeInSeconds = Math.floor(Date.now() / 1000)
    this.buttonConfig.isEnabled =
      (this.cardData.startDate - currentTimeInSeconds) < 300 ? true : false
    this.cardData.startDate = (this.cardData.startDate>0)?moment.unix(this.cardData.startDate).toLocaleString():this.cardData.startDate;
  }
  buttonClicked(action: any, data: any) {
    let detail: any = { action: action, data: data }
    this.buttonClick.emit(detail)
  }
  
  onCardClick(cardData: any){
    let value = {
      data: cardData._id,
      type: 'cardSelect',
    }
    this.router.navigate(["/session-detail"], { queryParams: {id: value.data}})
  }

}
