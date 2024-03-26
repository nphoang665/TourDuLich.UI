import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {
  response!: any;
  constructor() { }
  LayResponse(res: any) {
    this.response = res;
  }
  GetResponese() {
    console.log(this.response);

    return this.response;
  }
}
