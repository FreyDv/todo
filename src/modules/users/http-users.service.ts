import {Injectable} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {OutputUserDto} from "./dto/output-user.dto";
import {EntityNotFoundException} from "../../common/exceptions/entity-not-found.exception";
import {OutputMeUserDto} from "./dto/output-me-user.dto";

@Injectable()
export class HttpUsersService{
    constructor(private readonly usersService: UsersService) {}

    async create(createUserDto: CreateUserDto): Promise<OutputUserDto>{
        let result = await this.usersService.create(createUserDto)
        return OutputUserDto.fromUserEntity(result);
    }
    async findAll(): Promise<OutputUserDto[]>{
        let result = await this.usersService.findAll()
        if(!result){
            throw new EntityNotFoundException('No one found');
        }
        return result.map((user)=>{
            return OutputUserDto.fromUserEntity(user);
        });
    }
    async findOne(id: number): Promise<OutputUserDto>{
        let result = await this.usersService.findOne(id);
        if(!result){
            throw new EntityNotFoundException('User not found');
        }
        return OutputUserDto.fromUserEntity(result);
    }
    async getMe(id: number): Promise<OutputMeUserDto>{
        let result = await this.usersService.findOne(id);
        if(!result){
            throw new EntityNotFoundException('User not found');
        }
        return OutputMeUserDto.fromUserEntity(result);
    }
    async remove(id:number){
        return  this.usersService.remove(id);
    }
}