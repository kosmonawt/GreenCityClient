import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CalendarBaseComponent } from '@shared/components/calendar-base/calendar-base.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@language-service/language.service';
import { HabitAssignService } from '@global-service/habit-assign/habit-assign.service';
import { map, take } from 'rxjs/operators';
import { HabitAssignInterface, HabitStatusCalendarListInterface } from 'src/app/interface/habit/habit-assign.interface';
import { CalendarInterface } from './calendar-interface';
import { calendarIcons } from 'src/app/image-pathes/calendar-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends CalendarBaseComponent implements OnInit, OnDestroy {

  public isHabitsPopUpOpen = false;
  public selectedDay: number | string;
  public habitsCalendarSelectedDate: string;
  public calendarIcons = calendarIcons;
  public isDayTracked: boolean;
  public formatedData: string;
  public isHabitListEditable: boolean;
  public isHabitChecked: boolean;
  public isHabitEnrolled: boolean;
  public currentDate: Date = new Date();
  public habits: HabitAssignInterface[];
  public daysCanEditHabits = 7;
  public isFetching: boolean;
  public allHabitsEnrolled: boolean;

  @HostListener('document:click', ['$event']) clickout() {
    if (this.isHabitsPopUpOpen) {
      this.closePopUp();
    }
  }

  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public habitAssignService: HabitAssignService
  ) {
    super(translate, languageService);
  }

  ngOnInit() {
    this.bindDefaultTranslate();
    this.subscribeToLangChange();
    this.buildCalendar();
    this.markCalendarDays();
  }

  public getFormatedDate(dayItem: CalendarInterface) {
    this.formatedData = `${dayItem.year}-${ dayItem.month + 1 < 10 ?
      '0' + (dayItem.month + 1) : dayItem.month + 1}-${dayItem.numberOfDate < 10 ?
      '0' + dayItem.numberOfDate : dayItem.numberOfDate}`;
  }

  public formatDate(dayItem: CalendarInterface) {
    return `${dayItem.year}-${ dayItem.month + 1 < 10 ?
      '0' + (dayItem.month + 1) : dayItem.month + 1}-${dayItem.numberOfDate < 10 ?
      '0' + dayItem.numberOfDate : dayItem.numberOfDate}`;
  }

  public checkIfFuture(dayItem: CalendarInterface) {
    this.getFormatedDate(dayItem);
    if (this.currentDate.setHours(0, 0, 0, 0) >= new Date(this.formatedData).setHours(0, 0, 0, 0)) {
      this.toggleHabitsList(dayItem);
    }
  }

  public toggleHabitsList(dayItem: CalendarInterface) {
    this.isFetching = true;
    this.isHabitsPopUpOpen = !this.isHabitsPopUpOpen;
    this.checkHabitListEditable();
    this.getActiveDateHabits(this.formatedData);
    this.selectedDay = dayItem.numberOfDate;
    this.habitsCalendarSelectedDate = this.months[dayItem.month] + ' ' + dayItem.numberOfDate + ', ' + dayItem.year;
    this.isDayTracked = !this.isDayTracked;
  }

  public checkHabitListEditable() {
    this.isHabitListEditable = false;
    if (this.currentDate.setHours(0, 0, 0, 0) - this.daysCanEditHabits * 24 * 60 * 60 * 1000 <=
        new Date(this.formatedData).setHours(0, 0, 0, 0)) {
      this.isHabitListEditable = true;
    }
  }

  public getActiveDateHabits(date: string) {
    this.habitAssignService.getHabitAssignByDate(date).pipe(
      take(1),
      map((habits: HabitAssignInterface[]) => habits.sort((habit1, habit2) => (habit1.id > habit2.id) ? 1 : -1))
    ).subscribe((data: HabitAssignInterface[]) => {
      this.habits = [...data];
      this.habits.forEach((habit: HabitAssignInterface) => {
        habit.enrolled = this.checkIfEnrolledDate(habit);
      });
      this.isFetching = false;
    });
  }

  public enrollHabit(habit: HabitAssignInterface) {
    this.habitAssignService.enrollByHabit(habit.habit.id, this.formatedData).pipe(
      take(1)
    ).subscribe();
  }

  public unEnrollHabit(habit: HabitAssignInterface) {
    this.habitAssignService.unenrollByHabit(habit.habit.id, this.formatedData).pipe(
      take(1)
    ).subscribe();
  }

  public toggleEnrollHabit(habit: HabitAssignInterface) {
    if (this.isHabitListEditable) {
      habit.enrolled = !habit.enrolled;
    }
  }

  public sendEnrollRequest() {
    this.habits.forEach((habit: HabitAssignInterface) => {
      if (habit.enrolled !== this.checkIfEnrolledDate(habit)) {
        habit.enrolled ? this.enrollHabit(habit) : this.unEnrollHabit(habit);
      }
    });
  }

  public checkIfEnrolledDate(habit: HabitAssignInterface) {
    this.isHabitEnrolled = false;
    habit.habitStatusCalendarDtoList.forEach((habitEnrollDate: HabitStatusCalendarListInterface) => {
      if (habitEnrollDate.enrollDate === this.formatedData) {
        this.isHabitEnrolled = true;
      }
    });
    return this.isHabitEnrolled;
  }

  public markCalendarDays() {
    this.calendarDay.forEach((day: CalendarInterface) => {
      const date = this.formatDate(day);
      if (this.currentDate.setHours(0, 0, 0, 0) >= new Date(date).setHours(0, 0, 0, 0)) {
        this.habitAssignService.getHabitAssignByDate(date).pipe(
          take(1)
        ).subscribe((habits: HabitAssignInterface[]) => {
          day.isHabitsTracked = habits.length > 0;
          day.isAllHabitsEnrolled = habits.every((habit: HabitAssignInterface) => {
            return habit.habitStatusCalendarDtoList.some((habitEnrollDate: HabitStatusCalendarListInterface) => {
              if (habitEnrollDate.enrollDate === date) {
                return true;
              }
              return false;
            });
          });
        });
      }
    });
  }

  public closePopUp() {
    this.isHabitsPopUpOpen = this.isHabitsPopUpOpen ? false : null;
    this.isDayTracked = false;
    this.sendEnrollRequest();
    this.habits = [];
  }
}
