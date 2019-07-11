import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable()
export class GoalsService {
  private apiUrl = environment.apiUrl + '/goals';

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient
  ) { }

  getById(id) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  upsert(goal: GoalInterface) {
    if (goal.completedDate) {
      goal.completedDate = this.datePipe.transform(goal.completedDate, 'yyyy-MM-dd');
    }
    if (goal.goalDate) {
      goal.goalDate = this.datePipe.transform(goal.goalDate, 'yyyy-MM-dd');
    }

    if (goal.id) {
      return this.update(goal);
    }
    return this.create(goal);
  }

  create(goal: GoalInterface) {
    goal.createdAt = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    return this.http.post(this.apiUrl, goal);
  }

  update(goal: GoalInterface) {
    return this.http.patch(this.apiUrl + '/' + goal.id, goal);
  }
}
