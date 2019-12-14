import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminuserPage } from './adminuser.page';

describe('AdminuserPage', () => {
  let component: AdminuserPage;
  let fixture: ComponentFixture<AdminuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
