import { ObjectId } from "mongoose";
export interface IUser {
  id: string;
  email: string;
  password: string;
  fullname: string;
  avatar: string;
}

export interface IUserMethods {
  checkPassword: (password: string) => Promise<boolean>;
}

export interface IEmployee {
  employee_id: ObjectId;
  user_id: ObjectId;
  avatar: string;
  first_name: string;
  last_name: string;
  designation: "manager" | "employee" | "admin";
  email: string;
  date_of_joining: Date;
  last_working_day: Date;
  mobile: number;
  alternate_mobile: number;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
  adhar_number: number;
  address: string;
  locality: string;
  city: string;
  pincode: string;
}

export interface IWorkDistribution {
  name: string; // ghanti/topali/roaster
  employees: ObjectId[];
  wage: number;
  wage_type: string; // per day/ per hr/ per beg
}
export interface IWorkDay {
  target: number;
  date: Date;
  achieved: number;
  work_distribution: IWorkDistribution[];
  started_at: Date;
  ended_at: Date;
  note: string;
  factory: string;
}

export interface ISalary {
  employee: ObjectId;
  amount: number;
  date: Date;
  work: ObjectId; // workday
  type: "credit" | "debit";
  note: string;
}

declare module "express-serve-static-core" {
  export interface Request {
    user: IUser;
  }
}
