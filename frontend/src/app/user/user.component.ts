import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
   }
  username: string;
  private sub: any;
  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
    this.username = 'Daigo'
    console.log(params);
    });
    }
    
    ngOnDestroy() {
    this.sub.unsubscribe();
    }
}
