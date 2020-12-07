import { LocalStorageService } from '../localstorage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mainLink } from '../../links';

import { HabitAssignDto } from 'src/app/model/habit/HabitAssignDto';
import { map } from 'rxjs/operators';
// import { HabitStatusDto } from 'src/app/model/habit/';
// import { HabitCalendarDto } from 'src/app/model/habit/';


@Injectable({
  providedIn: 'root'
})
export class HabitAssignService {

  private habits: BehaviorSubject<HabitAssignDto[]> = new BehaviorSubject([]);

  apiUrl = `${mainLink}/habit/assign`;
  userId: number;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    localStorageService.userIdBehaviourSubject.subscribe(userId => this.userId = userId);
  }

  getActiveHabitAssigns(language: string): Observable<HabitAssignDto[]> {
    return this.http.get<HabitAssignDto[]>(`${this.apiUrl}?lang=${language}`).pipe(
      map( habits => habits.sort((habit1, habit2) => (habit1.id > habit2.id) ? 1 : -1))
    );
  }

  getActiveDateHabits(date: string, language: string): Observable<HabitAssignDto[]> {
    return this.http.get<HabitAssignDto[]>(`${this.apiUrl}/active/${date}?lang=${language}`).pipe(
      map( habits => habits.sort((habit1, habit2) => (habit1.id > habit2.id) ? 1 : -1))
    );
  }

  enrollHabitForSpecificDate(habitId: number, date: string){
    if (habitId === undefined) {
      return of<any>();
    }
    if (date === undefined) {
      return of<any>();
    }
    const body = {
      id: habitId,
      date: date
    };
    return this.http.post(`${this.apiUrl}/${habitId}/enroll/${date}`, body);
  }

  unenrollHabitForSpecificDate(habitId: number, date: string){
    if (habitId === undefined) {
      return of<any>();
    }
    if (date === undefined) {
      return of<any>();
    }
    const body = {
      id: habitId,
      date: date
    };
    return this.http.post(`${this.apiUrl}/${habitId}/unenroll/${date}`, body);
  }
}
