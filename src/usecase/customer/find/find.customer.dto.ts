export interface InputFindCustomerDTO {
    id: string
}

export interface OuputFindCustomerDTO {
    id: string
    name: string
    address: {
        street: string
        city: string
        number: number
        zip : string
    }
}