export interface State {
  users: User[];
  currentUser: User | null;
  posts: Post[];
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
  contentUrl: string;
  description: string;
  likes: string[];
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  postId: number;
  authorId: string;
  text: string;
  createdAt: string;
}
