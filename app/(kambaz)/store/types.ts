export type Course = {
  _id: string;
  name: string;
  number: string;
  description: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  image: string;
  term: string;
};

export type Module = {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: { _id: string; name: string; description: string; module: string }[];
  editing?: boolean;
};

export type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
  dob?: string;
};

export type Enrollment = { _id: string; user: string; course: string };

export type Assignment = {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  due: string;
  available: string;
  until: string;
  group: string;
  displayGrade: string;
  submissionType: string;
  entryOptions: string[];
  assignTo: string;
  notes: string;
};
