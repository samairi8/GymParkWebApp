import { Component, OnInit } from '@angular/core';
import { Cours } from '../models/cours';
import { CoursService } from '../services/cours.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  courseForm: FormGroup;
  courses: Cours[] = [];
  isUpdateForm: boolean = false;
  selectedCourse: Cours | null = null;

  constructor(private formBuilder: FormBuilder, private coursService: CoursService) {
    this.courseForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.coursService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  onSubmit() {
    const formData = this.courseForm.value;
    if (this.isUpdateForm && this.selectedCourse) {
      this.coursService.updateCourse(this.selectedCourse.id, formData).subscribe(() => {
        this.getCourses();
        this.resetForm();
      });
    } else {
      this.coursService.createCourse(formData).subscribe(() => {
        this.getCourses();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.courseForm.reset();
    this.isUpdateForm = false;
    this.selectedCourse = null;
  }
  showUpdateForm(course: Cours) {
    this.isUpdateForm = true;
    this.selectedCourse = course;
    this.courseForm.setValue({
      nom: course.nom,
      description: course.description
    });
  }

  editCourse(course: Cours) {
    this.isUpdateForm = true;
    this.selectedCourse = course;
    this.courseForm.setValue({
      nom: course.nom,
      description: course.description
    });
  }

  deleteCourse(id: number) {
    this.coursService.deleteCourse(id).subscribe(() => {
      this.getCourses();
      this.resetForm();
    });
  }
}
