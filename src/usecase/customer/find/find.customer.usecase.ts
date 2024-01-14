import { CustomerRepositoryInterface } from "@/domain/customer/repository";
import { InputFindCustomerDTO, OutputFindCustomerDTO } from ".";

export default class FindCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

    async execute (input: InputFindCustomerDTO) : Promise<OutputFindCustomerDTO> {
        const customer = await this.customerRepository.find(input.id)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                city: customer.Address.city,
                zip: customer.Address.zip
            }
        }
    }

}