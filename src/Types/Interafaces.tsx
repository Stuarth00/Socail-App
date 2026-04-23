export interface State {
  users: UserProfile[];
  currentUser: UserProfile | null;
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

export interface UserProfile extends User {
  aboutMe?: string;
  location?: string;
  interests?: string[];
  avatar?: string;
  genre?: string;
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
