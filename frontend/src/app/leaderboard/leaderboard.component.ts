import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  displayedColumns = ['rank', 'name', 'money'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router) { }

  linkToUser(row){
    console.log("username is:",row.name);
    this.router.navigate(['/user',row.name])
  }
  
}



export interface User{
  rank: number,
  name: string,
  money: number,
  winloss: string
}


const ELEMENT_DATA: User[] = [
  {rank: 1, name: "Daigo", money: 100000, winloss: "57%"},
  {rank: 2, name: "Mago", money: 40000,winloss: "50%"},
  {rank: 3, name: "Fujimura", money: 30000,winloss: "49%"},
  {rank: 4, name: "Moke", money: 4000,winloss: "47%"},
  {rank: 5, name: "Snake-Eyes", money: 3000,winloss: "45%"},
  {rank: 6, name: "Punk", money: 1500,winloss: "47%"},
  {rank: 7, name: "Bonchan", money:1200,winloss: "54%"},
  {rank: 8, name: "Tokido", money: 1100,winloss: "30%"},
  {rank: 9, name: "Fuudo", money: 1050,winloss: "29%"},
  {rank: 10, name: "ProblemX", money: 904,winloss: "32%"},
  {rank: 11, name: "Momochi", money: 900,winloss: "23%"},
  {rank: 12, name: "Idom", money: 700,winloss: "40%"},
  {rank: 3, name: "normal person 1", money: 600,winloss: "57%"},
  {rank: 3, name: "normal person 2", money: 500,winloss: "57%"},
  {rank: 3, name: "normal person 3", money: 400,winloss: "57%"},
  {rank: 3, name: "normal person 4", money: 300,winloss: "57%"},
  {rank: 3, name: "normal person 5", money: 250,winloss: "57%"},
  {rank: 3, name: "normal person 6", money: 200,winloss: "57%"},
  {rank: 3, name: "normal person 7", money: 150,winloss: "57%"},
  {rank: 3, name: "normal person 8", money: 100,winloss: "57%"},


];