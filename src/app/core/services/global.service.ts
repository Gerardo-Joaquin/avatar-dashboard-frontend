import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  ENDPOINT = 'http://localhost:8000'
  constructor() { }
}
