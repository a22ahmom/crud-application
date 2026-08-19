import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoolList } from './bool-list';

describe('BoolList', () => {
  let component: BoolList;
  let fixture: ComponentFixture<BoolList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoolList],
    }).compileComponents();

    fixture = TestBed.createComponent(BoolList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
