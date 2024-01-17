import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { join } from "path";
import { createReadStream, createWriteStream, rename } from "fs";
import { randomUUID } from "crypto";

function getExtension(filename: string) {
	const match = /\.([0-9a-z]+)$/i.exec(filename);
	return match ? match[1].toLowerCase() : false;
}

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async createUser(dto: CreateUserDto, file: Express.Multer.File) {
		if (!dto.name) {
			throw new HttpException("имя не должно быть пустым", HttpStatus.BAD_REQUEST);
		}

		if (!dto.surname) {
			throw new HttpException("фамилия не должна быть пустой", HttpStatus.BAD_REQUEST);
		}

		if (!dto.groupNumber) {
			throw new HttpException("номер группы не должен быть пустой", HttpStatus.BAD_REQUEST);
		}

		if (!file) {
			throw new HttpException("должен быть загружен файл", HttpStatus.BAD_REQUEST);
		}

		const extention = getExtension(file.originalname);
		const filePath = join(__dirname, "..", "uploads", randomUUID() + `.${extention}`);
		if (extention) {
			rename(file.path, filePath, (err) => {
				if (err) {
					console.error(err);
					throw new HttpException("ошибка при чтении файла", HttpStatus.BAD_REQUEST);
				}
				console.log(`File  renamed to  successfully.`);
			});
		}
		const user = await this.userRepository.create({ ...dto, filePath });
		return {
			id: user.id,
		};
	}
}
