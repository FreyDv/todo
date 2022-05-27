import {Injectable} from "@nestjs/common";
import {UsersService} from "./users.service";


@Injectable()
export class HttpUsersService{
    constructor(private readonly usersService: UsersService) {}

}