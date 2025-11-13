export interface AuthWithPasswordResponse {
  token: string;
  record: User;
}

export interface User {
  collectionId: string;
  collectionName: string;
  id: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar: string;
  created: Date;
  updated: Date;
}
