export type Contact ={
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  level: string;
  priority: string;
  request: string;
  subject: string;
  desc: string;
  employeeId: string;
  createdAt: string;
};

export type Parent = {
  id:string;
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  dob: string
  address: string
  nin: string
  starting: string
  description: string
  imageUrl: string
  // Added controlled fields
  gender: string
  department: string
  religion: string
  stateOfOrigin: string
  lga: string
  createdAt: string;
  updatedAt:string;
}

export type DepartmentCreateProps ={
  name: string
  code: string
  description?: string
  location?: string
  manager: string
  managerId: string
  established: string
}