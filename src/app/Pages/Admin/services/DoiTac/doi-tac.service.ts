import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoiTac } from '../../models/doi-tac.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoiTacService {

  constructor(private http: HttpClient) { }
  getAllDoiTac(): Observable<DoiTac[]> {
    return this.http.get<DoiTac[]>(`${environment.apiBaseUrl}/api/DoiTac`);
  }
}
