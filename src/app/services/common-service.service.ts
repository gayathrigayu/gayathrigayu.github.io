import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  toggleBaseUrl = 'https://api.track.toggl.com/api/';
  toggleWorkspaceId = 538676;
  constructor(private http: HttpClient) {

  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/Pricing.json");
  }

  public connectToggleApi() {
    const headers= new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Basic Z2F5YXRocmlAd2VhcmV0ZWxlc2NvcGljLmNvLnVrOlZpdmVrMTIz').set('Accept', 'application/json');
    return this.http.get(this.toggleBaseUrl+'v9/workspaces/'+this.toggleWorkspaceId + '/projects', { 'headers': headers });
  }
}
