import { Component, OnInit} from '@angular/core';
import { ApiDataService } from '../../Shared/Services/api-data.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId = '6053689d390a51061881971d' //this is just during dev the user id of whoever logs in will be placed here
  userInfo: any = [];
  messageList: any = ['Nice Work!','Awesome Job!','You Got It!','Awesome Sauce.','Get It Math Wiz!'];
  problems:any = [];
  posts:any = [];
  postDate = '';
  recentPosts:any = [];
  mathFact = '';
  likeCount = 0;
  randInt = 0;
  i = 0;
  userXP = 0;
  problemStreak = 0
  j = this.getRandomInt(0, this.problems.length-1);
  clickCount = 0;
  problemAttempts = 0;
  public userAnswer!: FormGroup;
  
  constructor(public _apiDataService: ApiDataService,
    public fb: FormBuilder, 
    ) { }
  
    ngOnInit(): void {
      this.initForm()
      this.getNewFact()
      this.getAllPosts()
      this.getAllProblems()
      this.getUserInfo()
    }
  initForm(): void {
    this.userAnswer = this.fb.group({
      solution: [null, Validators.required]
    });
  }
  getNewFact(){
    this._apiDataService.getFact().
    subscribe((data) => {
      this.mathFact = data;
    });
  }
  getAllPosts(){
    this._apiDataService.getAllPosts();
    this._apiDataService.listOfPostsObs
    .subscribe(data => {
      this.posts = data;
      this.recentPosts = this.posts.reverse()
      this.postDate = this.recentPosts[this.i]?.createdAt.toString().slice(0,10)
    });
  }
  updatePostLikes(){
    let postLikes = this.recentPosts[this.i].likes
    if (this.clickCount == 0){
      postLikes +=1;
      let postData = {
        _id: this.recentPosts[this.i]._id,
        likes: postLikes
      }
      this._apiDataService.updateLikes(postData).
      subscribe((data: any) => {
      });
      alert("You Liked This Post")
      
    } else if (this.clickCount == 1){
    postLikes -= 1;
    let postData = {
      _id: this.recentPosts[this.i]._id,
      likes: postLikes
    }
    this._apiDataService.updateLikes(postData).
    subscribe((data: any) => {
    });
    alert("You Unliked This Post")
  }
  }

  scrollLeft(){
    if (this.i > 0) {
      this.i --;
    } else {
      this.i = this.recentPosts.length - 1
    }
    this.postDate = this.recentPosts[this.i]?.createdAt.toString().slice(0,10)
  }

  scrollRight(){
    if (this.i == this.recentPosts.length -1 ){
      this.i = 0
    } else {
      this.i ++;
    }
    this.postDate = this.recentPosts[this.i]?.createdAt.toString().slice(0,10)
  }

  getAllProblems(){
    this._apiDataService.getAllProblems();
    this._apiDataService.listOfProblemsObs
    .subscribe(data => {
      this.problems = data;
      this.initAttempts()
    });
  }

  checkUserAnswer(){
    let problemAnswer = this.problems[this.j].solution;
    if (this.userAnswer.value.solution == problemAnswer){
      this.userAnswer.reset();
      this.updateStreak(true)
      this.skipProblem();
      alert(this.messageList[this.getRandomInt(0,this.messageList.length-1)])
      this.initAttempts();
      this.getUserInfo()
    } else if( this.userAnswer.value.solution == null){
      this.problemAttempts -= 1;
      alert("Please enter a value!")
      if (this.problemAttempts == 0){
        this.problemAttempts = 0;
        this.userAnswer.reset();
        alert("You Failed This Question! Onto The Next! The correct answer is: " + this.problems[this.j].solution)
        this.updateStreak(false)
        this.skipProblem();
        this.initAttempts();
      }
    } else if (this.userAnswer.value.solution != problemAnswer){
      this.userAnswer.reset();
      this.problemAttempts -= 1;
      if (this.problemAttempts == 0){
        this.problemAttempts = 0;
        this.userAnswer.reset();
        alert("You Failed This Question! Onto The Next! The correct answer is: " + this.problems[this.j].solution)
        this.updateStreak(false)
        this.skipProblem();
        this.initAttempts();
      }
    }
  }

  skipProblem() {
      this.j = this.getRandomInt(0,this.problems.length-1)
      this.initAttempts();
  }

  getRandomInt(min: any, max: any) {
    let r =  Math.floor(Math.random() * (max - min +1)) + min;
    return r;
  }

  initAttempts(){
    this.problemAttempts  = this.problems[this.j].attempts;
  }
  
  getUserInfo(){
    let postData = {
      _id: this.userId
    }
    this._apiDataService.getCurrentUserInfo(postData)
    this._apiDataService.userInfoObs
    .subscribe(data => {
      this.userInfo = data;
      this.userXP = this.userInfo.xp;
      this.problemStreak = this.userInfo.streak;
    });
  }

  updateStreak(bool: boolean) {
    let streak = this.userInfo.streak;
    let xp = parseInt(this.userInfo.xp)
    let newXP = xp +=1;
    let amount = 0;
    let postData = {
      _id: this.userId,
      streak: this.userInfo.streak
    }
    let xpData = {
      _id: this.userId,
      xp: newXP
    }

    if (streak >= 100){
      postData = {
        _id: this.userId,
        streak: 0
      }
      this._apiDataService.updateStreak(postData).
      subscribe((data: any) => {
      });
      this.getUserInfo()
      this._apiDataService.updateXP(xpData).
      subscribe((data: any) => {
      });
       this.getUserInfo()
       this.userXP = this.userInfo.xp;
       this.problemStreak = this.userInfo.streak;
    } else{
    if (bool == true) {
      console.log("called on first go")
      if (this.userInfo.xp <= 5) {
        amount = 25;
      } else if (this.userInfo.xp > 5 && this.userInfo.xp <= 10) {
        amount = 15;
      } else if (this.userInfo.xp > 10 && this.userInfo.xp <= 15) {
        amount = 10;
      } else if (this.userInfo.xp > 15 && this.userInfo.xp <= 20) {
        amount = 5;
      } else if (this.userInfo.xp > 20) {
        amount = 2;
      }
      postData = {
        _id: this.userId,
        streak: streak += amount
      }
      this._apiDataService.updateStreak(postData).
      subscribe((data: any) => {
      });
      this.getUserInfo()
      this.problemStreak = this.userInfo.streak;
    } else if (bool == false) {
      postData = {
        _id: this.userId,
        streak: 0
      }
      this._apiDataService.updateStreak(postData).
      subscribe((data: any) => {
      });
      this.getUserInfo()
    }
  }
}
}
