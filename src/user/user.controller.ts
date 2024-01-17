import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { isGetDto } from "../operator/dto/isGet.dto";
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	@UseInterceptors(FileInterceptor("file"))
	createUser(@Body() userDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
		return this.userService.createUser(userDto, file);
	}
}
