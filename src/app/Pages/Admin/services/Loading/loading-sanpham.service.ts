import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSanphamService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
