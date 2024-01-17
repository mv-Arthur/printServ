import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/user.model";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class OperatorService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async getAllRequests() {
		return await this.userRepository.findAll();
	}

	async getOneRequest(id: number) {
		return await this.userRepository.findByPk(id);
	}

	async setStatus(id: number, updateDto: UpdateDto) {
		const reqest = await this.userRepository.findByPk(id);
		return await this.userRepository.update(
			{ ...reqest, status: updateDto.newStatus, price: updateDto.newPrice },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async getFilePathById(id: number) {
		return (await this.userRepository.findByPk(id)).filePath;
	}

	async drop() {
		await this.userRepository.destroy({
			where: {},
			truncate: true,
			cascade: true,
		});
	}
}
