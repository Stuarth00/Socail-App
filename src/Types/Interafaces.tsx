export interface State {
  users: UserProfile[];
  currentUser: UserProfile | null;
  posts: Post[];
}

export type NewUser = Omit<User, "id">;

export interface Token {
  token: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  password: string;
}

export interface UserProfile extends User {
  about_me?: string;
  location?: string;
  interests?: string[];
  avatar?: string;
  gender?: string;
  followers?: string[];
  following?: string[];
}

export interface Post {
  content_url?: string;
  description?: string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: string;
  text: string;
  createdAt: string;
}
