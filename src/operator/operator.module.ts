import { Module } from "@nestjs/common";
import { OperatorController } from "./operator.controller";
import { OperatorService } from "./operator.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/user/user.model";

@Module({
	controllers: [OperatorController],
	providers: [OperatorService],
	imports: [SequelizeModule.forFeature([User])],
})
export class OperatorModule {}
