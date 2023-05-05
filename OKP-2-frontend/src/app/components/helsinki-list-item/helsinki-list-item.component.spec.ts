import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelsinkiListItemComponent } from './helsinki-list-item.component';

describe('HelsinkiListItemComponent', () => {
  let component: HelsinkiListItemComponent;
  let fixture: ComponentFixture<HelsinkiListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelsinkiListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelsinkiListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
