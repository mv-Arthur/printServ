import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { OperatorService } from "./operator.service";
import { Response } from "express";
import { UpdateDto } from "./dto/update.dto";
import { isGetDto } from "./dto/isGet.dto";
@Controller("operator")
export class OperatorController {
	constructor(private operatorService: OperatorService) {}

	@Get()
	getAll() {
		return this.operatorService.getAllRequests();
	}

	@Get("/:id")
	findOne(@Param("id") id: number) {
		return this.operatorService.getOneRequest(id);
	}

	@Put("/:id")
	updateStatus(@Param("id") id: number, @Body() updateDto: UpdateDto) {
		return this.operatorService.setStatus(id, updateDto);
	}

	@Get("file/:id")
	async sendFile(@Param("id") id: number, @Res() res: Response) {
		const file = await this.operatorService.getFilePathById(id);
		res.sendFile(file);
	}

	@Delete()
	async drop() {
		this.operatorService.drop();
	}
}
