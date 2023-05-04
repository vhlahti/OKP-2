import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelsinkiListComponent } from './helsinki-list.component';

describe('HelsinkiListComponent', () => {
  let component: HelsinkiListComponent;
  let fixture: ComponentFixture<HelsinkiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelsinkiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelsinkiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
