import {Injectable} from '@angular/core';
import {HabitStatisticDto} from '../../model/habit/HabitStatisticDto';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {HabitDto} from '../../model/habit/HabitDto';
import {habitStatisticLink, userLink} from '../../links';

@Injectable({
  providedIn: 'root'
})
export class HabitStatisticService {
  getUserHabitsLink = `${userLink}/${window.localStorage.getItem('id')}/habits`;
  getHabitStatisticLink = `${habitStatisticLink}`;
  updateHabitStatistic = `${habitStatisticLink}`;

  constructor(private http: HttpClient) {
  }

  getTrackedHabits(): Observable<HabitDto[]> {
    return this.http.get<HabitDto[]>(this.getUserHabitsLink);
  }

  getHabitStatistic(habit: HabitDto): Observable<HabitStatisticDto[]> {
    return this.http.get<HabitStatisticDto[]>(this.getHabitStatisticLink + habit.id);
  }

  updatedHabitStatistic(habitStatistic: HabitStatisticDto): Observable<HabitStatisticDto> {
    return this.http.patch<HabitStatisticDto>(this.updateHabitStatistic + habitStatistic.id, habitStatistic);
  }
}
