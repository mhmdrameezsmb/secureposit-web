import "next-auth";

export interface UserMe {
  id: number;
  uid: string;
  name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  provider: string;
  role: string;
  email: string;
  phone: string;
  phone_code: string;
  enable_2fa: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: string
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
    user: User;
  }
}

declare module "next-auth" {
  export interface User extends UserMe {}
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    expires: ISODateString;
    user: User;
    error?: any;
  }
}
