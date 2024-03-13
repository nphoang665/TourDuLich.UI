import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoiTac } from '../../models/doi-tac.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoitacService {

  constructor(private http: HttpClient) { }
  getAllDoiTac(): Observable<DoiTac[]> {
    return this.http.get<DoiTac[]>(`${environment.apiBaseUrl}/api/DoiTac`);
  }
}
