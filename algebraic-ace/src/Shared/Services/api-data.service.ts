import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'https://alg-ace-server.herokuapp.com';

const problemplaceholderData = {
  problem: "",
  description: "",
  solution: "",
  attempts: 0 
}
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private listOfPosts = new BehaviorSubject([]);
  public listOfPostsObs = this.listOfPosts.asObservable();
  private listOfProblems = new BehaviorSubject([problemplaceholderData]);
  public listOfProblemsObs = this.listOfProblems.asObservable();
  private userInfo = new BehaviorSubject([]);
  public userInfoObs = this.userInfo.asObservable();
  private listOfvideoSources = new BehaviorSubject([]);
  public videoSourcesObs = this.listOfvideoSources.asObservable();
  private listOfwebSources = new BehaviorSubject([]);
  public webSourcesObs = this.listOfwebSources.asObservable();

  constructor(
    public http: HttpClient
  ) { }

  createNewPost(incomingData: any){
    return this.http.post(`${baseUrl}/create-post`, incomingData)
  }
  createNewPOD(incomingData: any){
    return this.http.post(`${baseUrl}/create-POD`, incomingData)
  }

  updateLikes(incomingData: any){
    return this.http.post(`${baseUrl}/update-likes`, incomingData)
  }
  updateStreak(incomingData: any){
    return this.http.post(`${baseUrl}/update-streak`, incomingData)
  }
  updateXP(incomingData: any){
    return this.http.post(`${baseUrl}/update-xp`, incomingData)
  }
  pullAllPosts(){
    return this.http.get(`${baseUrl}/get-user-posts`)
  }

  getAllPosts() {
    this.pullAllPosts().subscribe((data: any) => {
      this.listOfPosts.next(data);
    }, (err) => {
      console.log(err);
    });
  }
  pullAllProblems(){
    return this.http.get(`${baseUrl}/get-all-problems`)
  }

  getAllProblems() {
    this.pullAllProblems().subscribe((data: any) => {
      this.listOfProblems.next(data);
    }, (err) => {
      console.log(err);
    });
  }
  pullUserInfo(incomingData: any) {
    return this.http.post(`${baseUrl}/get-current-user`, incomingData)
  }
  getCurrentUserInfo(incomingData: any){
    this.pullUserInfo(incomingData).subscribe((data: any) => {
      this.userInfo.next(data);
    }, (err) => {
      console.log(err);
    });
  }
  pullFilteredVideos(incomingData: any) {
    return this.http.post(`${baseUrl}/get-filtered-videos`,incomingData)
  }
  getAllVideos(incomingData: any) {
    this.pullFilteredVideos(incomingData).subscribe((data: any) => {
      this.listOfvideoSources.next(data);
    }, (err) => {
      console.log(err);
    });
  }
  pullFilteredPages(incomingData: any) {
    return this.http.post(`${baseUrl}/get-filtered-webpages`,incomingData)
  }
  
  getAllPages(incomingData: any) {
    this.pullFilteredPages(incomingData).subscribe((data: any) => {
      this.listOfwebSources.next(data);
    }, (err) => {
      console.log(err);
    });
  }

  getFact(){
    return this.http.get(`${baseUrl}/get-random-fact`, {responseType: 'text'})
  }
  
}
