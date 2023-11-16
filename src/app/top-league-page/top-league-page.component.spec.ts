import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeaguePageComponent } from './top-league-page.component';

describe('TopLeaguePageComponent', () => {
  let component: TopLeaguePageComponent;
  let fixture: ComponentFixture<TopLeaguePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLeaguePageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopLeaguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
