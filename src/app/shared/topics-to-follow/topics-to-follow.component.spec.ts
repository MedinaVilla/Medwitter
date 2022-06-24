import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsToFollowComponent } from './topics-to-follow.component';

describe('TopicsToFollowComponent', () => {
  let component: TopicsToFollowComponent;
  let fixture: ComponentFixture<TopicsToFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsToFollowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsToFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
