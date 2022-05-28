import {Injectable} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {OutputUserDto} from "./dto/output-user.dto";

@Injectable()
export class HttpUsersService{
    constructor(private readonly usersService: UsersService) {}

    async create(createUserDto: CreateUserDto): Promise<OutputUserDto>{
        let result = await this.usersService.create(createUserDto)
        return OutputUserDto.fromUserEntity(result);
    }
}