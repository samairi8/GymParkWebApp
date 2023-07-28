import { User } from "./user";

export interface Membership {
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: User;    //    user?: User; // Make the user property optional by adding '?'
}
