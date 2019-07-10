import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../core/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private url = `${environment.apiUrl}/plans`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUserPlan(user) {
    let params = new HttpParams();
    params = params.append('userId', '' + user.id);
    params = params.append('_embed', 'goals');
    return this.http.get(this.url, {params}).pipe(
      map((response: any[]) => {
        if (response.length) {
         return response[0];
        }
        return {};
      })
    );
  }
}
