export type Role = 'Doctor' | 'Organization' | 'Patient';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  credentials: string;
  skills: Record<string, number>;
  profilePicture: string;
  about: string;
}

export interface Organization {
  id: string;
  hospitalName: string;
  location: string;
  jobOpenings: string[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
}

export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface Patient {
  id: string;
  name: string;
  pastAppointments: string[];
}
