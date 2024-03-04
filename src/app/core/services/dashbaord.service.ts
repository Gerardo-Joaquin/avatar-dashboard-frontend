import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbaordService {

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  getCommentsUsers(): Observable<any> {
    return this.http.get(`${this.global.ENDPOINT}/dashboard/comments_users`)
  }
}
