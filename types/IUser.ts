export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image: string
  order: number;
}
