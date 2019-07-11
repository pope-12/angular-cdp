import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../core/auth/user.interface';
import { PlanInterface } from '../plan.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PlanService {
  private url = `${environment.apiUrl}/plans`;

  constructor(private http: HttpClient) { }

  getUserPlan(user: UserInterface): Observable<PlanInterface> {
    let params = new HttpParams();
    params = params.append('userId', '' + user.id);
    params = params.append('_embed', 'goals');

    return this.http.get<PlanInterface[]>(this.url, {params}).pipe(
      map((response: PlanInterface[]) => {
        if (response.length) {
         return response[0];
        }

        return null;
      })
    );
  }
}
