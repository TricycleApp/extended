import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminprodPage } from './adminprod.page';

describe('AdminprodPage', () => {
  let component: AdminprodPage;
  let fixture: ComponentFixture<AdminprodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminprodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminprodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
