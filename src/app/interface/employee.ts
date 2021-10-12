/* tslint:disable */
export interface Employee {
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  gender?: string;
  imageUrl?: string;
  departmentId?: string;
  grossSalary?: number;
  position?: string;
  status?: boolean;
}


export interface TimeSheet {
  employeeId?: any;
  hours?: number;
  Date?: Date;
}
