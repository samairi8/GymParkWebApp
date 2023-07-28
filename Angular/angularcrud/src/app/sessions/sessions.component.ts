import { Component, OnInit } from '@angular/core';
import { Session } from '../models/session';
import { SessionService } from '../services/session.service';
import { Coach } from '../models/coach';
import { Cours } from '../models/cours';
import { FormBuilder, FormGroup } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  sessionFormGroup: FormGroup = this.formBuilder.group({
    // Initialize your form controls here
    nom: [''],
    dateHeureDebut: [''],
    dateHeureFin: [''],
    coursId: [''],
    coachId: ['']
  });
  sessions: Session[] = [];
  coaches: Coach[] = [];
  courses: Cours[] = [];
  showUpdate: boolean = false;
  isUpdating = false; // Track whether we are updating a session
  selectedSession: Session | null = null; // Define selectedSession property

  constructor(private sessionService: SessionService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getCoaches();
    this.getCourses();
    this.getSessions();
  }

  getCoaches(): void {
    this.sessionService.getCoaches().subscribe(
      (coaches) => {
        this.coaches = coaches;
      },
      (error) => {
        console.error('Error fetching coaches:', error);
      }
    );
  }

  getCourses(): void {
    this.sessionService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  getSessions(): void {
    this.sessionService.getSessions().subscribe(
      (sessions) => {
        this.sessions = sessions;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  createSession(sessionForm: any): void {
    if (sessionForm.valid) {
      const formData = sessionForm.value;
      const coachId = +formData.coachId; // Convert the coachId to a number
      const coursId = +formData.coursId; // Convert the coursId to a number

      const coach = this.coaches.find((c) => c.id === coachId);
      const cours = this.courses.find((c) => c.id === coursId);

      if (!coach || !cours) {
        console.error('Coach or Course not found with the provided IDs.');
        return;
      }

      const session: Session = {
        id: 0,
        nom: formData.nom,
        dateHeureDebut: formData.dateHeureDebut,
        dateHeureFin: formData.dateHeureFin,
        coachId: coachId,
        coursId: coursId,
        coach: coach,
        cours: cours
      };

      this.sessionService.createSession(session).subscribe(
        (response) => {
          console.log('Session created:', response);
          this.getSessions();
          sessionForm.resetForm();
        },
        (error) => {
          console.error('Error creating session:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.sessionFormGroup.reset();
  }

  updateSession(): void {
    // Get the values from the form group directly
    const formData = this.sessionFormGroup.value;
    // Use the formData to update the selected session
    if (this.selectedSession) {
      this.selectedSession.nom = formData.nom;
      this.selectedSession.dateHeureDebut = formData.dateHeureDebut;
      this.selectedSession.dateHeureFin = formData.dateHeureFin;
      this.selectedSession.coursId = formData.coursId;
      this.selectedSession.coachId = formData.coachId;

      // Call the updateSession method from the service to persist the changes
      this.sessionService.updateSession(this.selectedSession.id, this.selectedSession).subscribe(
        (updatedSession) => {
          console.log('Session updated:', updatedSession);
          this.getSessions();
          this.resetForm();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating session:', error);
        }
      );
    }
  }



  deleteSession(id: number): void {
    this.sessionService.deleteSession(id).subscribe(
      () => {
        console.log('Session deleted successfully.');
        // Refresh the sessions list after successful deletion
        this.getSessions();
      },
      (error) => {
        console.error('Error deleting session:', error);
      }
    );
  }

  // Additional method for handling form submission during update
  submitUpdate(): void {
    if (this.isUpdating) {
      const formData = this.sessionFormGroup.value;
      const coachId = +formData.coachId;
      const coursId = +formData.coursId;

      const coach = this.coaches.find((c) => c.id === coachId);
      const cours = this.courses.find((c) => c.id === coursId);

      if (!coach || !cours) {
        console.error('Coach or Course not found with the provided IDs.');
        return;
      }

      const session: Session = {
        id: this.sessions.length + 1, // Assign a new ID (replace with an appropriate logic)
        nom: formData.nom,
        dateHeureDebut: formData.dateHeureDebut,
        dateHeureFin: formData.dateHeureFin,
        coachId: coachId,
        coursId: coursId,
        coach: coach,
        cours: cours
      };

      this.sessionService.updateSession(session.id, session).subscribe(
        (response) => {
          console.log('Session updated:', response);
          this.isUpdating = false; // Reset the isUpdating flag after successful update
          this.sessionFormGroup.reset();
          this.getSessions();
        },
        (error) => {
          console.error('Error updating session:', error);
        }
      );
    }
  }
  populateForm(session: Session): void {
    this.sessionFormGroup.setValue({
      nom: session.nom,
      dateHeureDebut: session.dateHeureDebut,
      dateHeureFin: session.dateHeureFin,
      coursId: session.coursId,
      coachId: session.coachId
    });
  }

  showUpdateForm(session: Session) {
    this.selectedSession = session;
    this.sessionFormGroup.setValue({
      nom: session.nom,
      dateHeureDebut: session.dateHeureDebut,
      dateHeureFin: session.dateHeureFin,
      coursId: session.cours.id,
      coachId: session.coach.id,
    });
    this.showUpdate = true;
  }

  hideUpdateForm() {
    this.showUpdate = false;
  }

}
