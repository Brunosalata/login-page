import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveChatLayoutComponent } from './live-chat-layout.component';

describe('LiveChatLayoutComponent', () => {
  let component: LiveChatLayoutComponent;
  let fixture: ComponentFixture<LiveChatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveChatLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveChatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
