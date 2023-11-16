import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeagueTableComponent } from './top-league-table.component';

describe('TopLeagueTableComponent', () => {
  let component: TopLeagueTableComponent;
  let fixture: ComponentFixture<TopLeagueTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLeagueTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopLeagueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
