export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface IJwtPayload {
  id: string;
  role: Role;
}
