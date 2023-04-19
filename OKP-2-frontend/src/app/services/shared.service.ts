import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentCaseSubject = new BehaviorSubject<string>('');

  setCurrentCase(caseValue: string) {
    this.currentCaseSubject.next(caseValue);
  }

  getCurrentCase() {
    return this.currentCaseSubject.asObservable();
  }
  
}