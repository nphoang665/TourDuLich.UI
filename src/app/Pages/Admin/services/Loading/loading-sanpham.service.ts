import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSanphamService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
