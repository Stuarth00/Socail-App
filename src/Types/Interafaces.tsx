export interface State {
  users: User[];
  currentUser: User | null;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  // avatar?: string;
  // genre: string;
  DateOfBirth: string;
  password: string;
}

export interface Post {
  id: number;
  authorId: string;
  content: {
    type: string;
    url: string;
  };
  description: string;
  likes: string[];
  comments: string[];
}
