import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Userarray: User[] = [];
  Userformgroup: FormGroup;
  constructor(private userservice: UserService, private fi: FormBuilder) {
    this.Userformgroup = this.fi.group({
      id: [""],
      nom: [""],
      prenom: [""],
      email: [""],
      date: [""],
      ville: [""],
      code_postal: [""],
    })
  }

  ngOnInit(): void {
    this.getUsers();

  }
  getUsers() {
    this.userservice.GetUser().subscribe(Response => {
      console.log(Response);
      this.Userarray = Response;
    })
  }
  Onsubmit() {
    const formValue = this.Userformgroup.value;
    formValue.id = Number(formValue.id); // Convert id to a number explicitly
  
    console.log(formValue);
  
    this.userservice.CreateUser(formValue).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
        this.Userformgroup.setValue({
          id: "",
          nom: "",
          prenom: "",
          email: "",
          date: "",
          ville: "",
          code_postal: "",
        });
  
        // Assuming the response contains the newly created user object with the 'id'
        // and other properties returned from the server, push it to the Userarray
        this.Userarray.push(response);
  
        // Optionally, you can also reset the form after successful submission
        this.Userformgroup.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
  
        if (error.status === 400 && error.error && error.error.errors) {
          // Handle validation errors
          const validationErrors = error.error.errors;
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              const errorMessage = validationErrors[key].join(', ');
              console.log(`${key}: ${errorMessage}`);
              // Display the errorMessage to the user using appropriate UI handling
            }
          }
        } else {
          // Handle other types of errors
          console.error('An unexpected error occurred.');
        }
      }
    );
  }
  
  Fillform(use:User){
    this.Userformgroup.setValue({
      id: use.id,
      nom: use.prenom,
      prenom: use.prenom,
      email: use.email,
      date: use.date,
      ville: use.ville,
      code_postal: use.code_postal,
    })


  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userservice.deleteUser(id).subscribe(
        () => {
          console.log('User deleted successfully.');
          // Filter out the deleted user from the Userarray
          this.Userarray = this.Userarray.filter((user) => user.id !== id);
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting user:', error);
          // Handle the error appropriately
        }
      );
    }
  }
  
}
