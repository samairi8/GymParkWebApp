import { Component, OnInit } from '@angular/core';
import { Membership } from '../models/membership';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MembershipService } from '../services/membership.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  memberships: Membership[] = [];
  users: User[] = [];
  MemberShipformgroup: FormGroup;
  usersFetched = false;

  constructor(
    private membershipService: MembershipService,
    private userService: UserService,
    private fi: FormBuilder
  ) {
    this.MemberShipformgroup = this.fi.group({
      type: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      createdAt: [''], // Add the createdAt form control here
      updatedAt: [''],
      user: ['']
    });
  }

  ngOnInit(): void {
    this.getMemberships();
    this.getUsers();
  }

  getMemberships() {
    this.membershipService.GetMemberships().subscribe(
      (response) => {
        console.log(response);
        this.memberships = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
      }
    );
  }

  getUsers() {
    this.userService.GetUser().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
        this.usersFetched = true;
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
      }
    );
  }

  onSubmit() {
    if (!this.usersFetched) {
      console.error('Users data not fetched yet.');
      return;
    }

    const formValue = this.MemberShipformgroup.value;

    // Convert the dates to ISO string format
    formValue.startDate = new Date(formValue.startDate).toISOString();
    formValue.endDate = new Date(formValue.endDate).toISOString();
    formValue.createdAt = new Date().toISOString();
    formValue.updatedAt = new Date().toISOString();

    console.log('Form value user:', formValue.user);
    console.log('Users array:', this.users);

    const selectedUser = this.users.find(user => user.id === parseInt(formValue.user, 10));

    console.log('Selected User:', selectedUser);

    if (!selectedUser) {
      console.error('Selected User not found.');
      return;
    }

    const membership: Membership = {
      id: this.memberships.length + 1, // Generate a unique ID (in a real app, this should be done on the server)
      type: formValue.type,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      status: formValue.status,
      createdAt: formValue.createdAt,
      updatedAt: formValue.updatedAt,
      user: {
        id: selectedUser.id,
        nom: selectedUser.nom,
        prenom: selectedUser.prenom,
        email: selectedUser.email,
        date: selectedUser.date,
        ville: selectedUser.ville,
        code_postal: selectedUser.code_postal
      }
    };

    // Add the new membership to the memberships array
    this.memberships.push(membership);

    // Optionally, you can also display a success message or perform any other actions here.
    console.log('Membership created:', membership);

    // Reset the form after successful submission
    this.MemberShipformgroup.reset();

    // Call the membership service to create a new membership using 'membership'
    this.membershipService.createMembership(membership).subscribe(
      (response) => {
        console.log('Membership created:', response);
        this.getMemberships();
        this.MemberShipformgroup.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating membership:', error);

        if (error.status === 400 && error.error && error.error.errors) {
          const validationErrors = error.error.errors;
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              const errorMessage = validationErrors[key].join(', ');
              console.log(`${key}: ${errorMessage}`);
            }
          }
        } else {
          console.error('An unexpected error occurred.');
        }
      }
    );
  }

  fillForm(membership: Membership) {
    const defaultCreatedAt = new Date().toISOString();
    const defaultUpdatedAt = new Date().toISOString();


    this.MemberShipformgroup.setValue({
      type: membership.type,
      startDate: membership.startDate,
      endDate: membership.endDate,
      status: membership.status,
      createdAt: defaultCreatedAt,
      updatedAt: defaultUpdatedAt, 
      user: membership.user ? membership.user.id : null,
    });
  }
  deleteMembership(id: number): void {
    this.membershipService.deleteMembership(id).subscribe(
      () => {
        console.log('Membership deleted successfully.');
        // Optionally, you can also display a success message or perform any other actions here.
        this.getMemberships(); // Refresh the list of memberships after deletion
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting membership:', error);
        // Optionally, you can display an error message or perform any other error handling here.
      }
    );
  }
    // Method to handle the delete button click for a membership
    onDeleteMembership(id: number): void {
      if (confirm('Are you sure you want to delete this membership?')) {
        this.deleteMembership(id);
      }
    }
  
}
