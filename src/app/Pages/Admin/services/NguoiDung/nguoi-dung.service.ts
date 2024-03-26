import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {

  constructor(@Inject(PLATFORM_ID) private playform_id: Object) { }

  LayNguoiDungTuLocalStorage() {
    if (isPlatformBrowser(this.playform_id)) {
      const NguoiDung = localStorage.getItem('NguoiDung');
      if (NguoiDung) {
        let nguoiDung = JSON.parse(NguoiDung);
        return nguoiDung;
      }
    }
    return null;
  }
}
