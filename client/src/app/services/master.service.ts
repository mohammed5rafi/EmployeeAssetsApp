import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root",
})
export class MasterService {
  constructor(private http: HttpClient) {}

  getMasterAssetsList(): Observable<any> {
    return this.http.get<any>(API_URL + "assets");
  }

  deleteAssetsItemsDetails(id): Observable<any> {
    return this.http.delete(`${API_URL}/assets/${id}`, { observe: "response" });
  }
}
