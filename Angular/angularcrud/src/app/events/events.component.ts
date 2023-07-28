import { Component } from '@angular/core';
interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  comments?: string[]; // Optional array to store comments

  // Add more properties as needed
}


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events: Event[] = [
    // Sample event data provided by the user
    {
      id: 1,
      title: 'Trip to the Beach',
      description: 'Enjoy a day at the beach with friends.',
      date: new Date('2023-07-30'),
      location: 'Sunny Beach Resort',
      comments: [], // Initialize comments array for the first event
    },
    {
      id: 2,
      title: 'Hiking Adventure',
      description: 'Explore the beautiful mountains and valleys.',
      date: new Date('2023-08-05'),
      location: 'Mountain Range Trail',
      comments: [], // Initialize comments array for the second event
    },
    // Add more events as needed
  ];

  newComment: { [key: number]: string } = {}; // Object to hold the user's new comment for each event

  addComment(event: Event) {
    const comment = this.newComment[event.id]?.trim();
    if (comment) {
      if (!event.comments) {
        event.comments = []; // Initialize comments array if it doesn't exist
      }
      event.comments.push(comment); // Add the new comment to the event's comments array
      this.newComment[event.id] = ''; // Clear the input field after adding the comment
    }
  }

  onEventClicked(event: any) {
    // Handle event click here (optional)
  }
}
