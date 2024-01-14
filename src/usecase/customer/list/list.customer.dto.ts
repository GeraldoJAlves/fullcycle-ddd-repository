export interface InputListCustomerDTO {}

export interface OutputListCustomerDTO {
  customers: {
    id: string;
    name: string;
    address: {
      street: string;
      number: number;
      city: string;
      zip: string;
    };
  }[];
}
