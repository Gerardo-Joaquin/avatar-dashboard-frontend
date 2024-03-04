import { Injectable } from '@angular/core';
import { NotificationType } from '../models/notification.model'

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  showNotification(
    message: string,
    type: NotificationType = NotificationType.INFO,
    timer: number = 1000,
    from: string = 'top',
    align: string = 'right',
    icon: string = 'pe-7s-gift',
  ) {

    $.notify({
      message: message,
    }, {
      type: type,
      timer: timer,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
