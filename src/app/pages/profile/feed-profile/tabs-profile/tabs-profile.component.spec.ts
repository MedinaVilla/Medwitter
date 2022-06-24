import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsProfileComponent } from './tabs-profile.component';

describe('TabsProfileComponent', () => {
  let component: TabsProfileComponent;
  let fixture: ComponentFixture<TabsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
