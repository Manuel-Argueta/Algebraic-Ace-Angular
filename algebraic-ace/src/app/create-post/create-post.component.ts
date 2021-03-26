import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiDataService } from '../../Shared/Services/api-data.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public createPost!: FormGroup;
  public createPOD!: FormGroup;
  constructor(public fb: FormBuilder,  
    private modalService: NgbModal,
    public _apiService: ApiDataService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.createPost = this.fb.group({
      title: [null, Validators.required],
      author:[null, Validators.required],
      content: [null, Validators.required]
    });
    this.createPOD = this.fb.group({
      problem: [null, Validators.required],
      description:[null, Validators.required],
      solution: [null, Validators.required],
      attempts: [null, Validators.required]
    });
  }
  createNewPost(){
    let postTitle = this.createPost.value.title;
    let postAuthor = this.createPost.value.author;
    let postContent = this.createPost.value.content;
    let postData = {
      "title": postTitle,
      "author": postAuthor,
      "content": postContent,
      "likes": 0
    }
    this._apiService.createNewPost(postData).
    subscribe((data: any) => {
      alert("Your Post Has Been Made!")
    });
    this.createPost.reset();
  }

  createNewPOD(){
    let problem = this.createPOD.value.problem;
    let problemDescription = this.createPOD.value.description;
    let problemSolution = this.createPOD.value.solution;
    let problemAttempts = this.createPOD.value.attempts;
    let postData = {
      "problem": problem,
      "description": problemDescription,
      "solution": problemSolution,
      "attempts": problemAttempts
    }
    this._apiService.createNewPOD(postData).
    subscribe((data: any) => {
      alert("Your Problem Has Been Added!")
    });
    this.createPOD.reset();
  }
  openPODExample(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
