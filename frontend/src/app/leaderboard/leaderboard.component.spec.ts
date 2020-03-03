import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { LeaderboardComponent } from './leaderboard.component';
import { routes } from '../app-routing.module'
import { UserComponent } from '../user/user.component';
import { Location } from '@angular/common'

describe('LeaderboardComponent', () => {
  let fixture: ComponentFixture<LeaderboardComponent>;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        LeaderboardComponent,
        UserComponent
      ]
    });

    router = TestBed.get(Router); (2)
    location = TestBed.get(Location); (3)

    fixture = TestBed.createComponent(LeaderboardComponent); (4)
    router.initialNavigation(); (5)
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('linkToUser links you to /user/Daigo', fakeAsync(() => {
    let leaderboard = new LeaderboardComponent(router);
    let row = {rank: 1, name: 'Daigo', money: 4000};
    leaderboard.linkToUser(row);
    console.log("path is:", location.path());
    tick();
    expect(location.path()).toBe(`/user/${row.name}`);
  }));
});
