import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { MulterModule } from "@nestjs/platform-express";

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [
		SequelizeModule.forFeature([User]),
		MulterModule.register({
			dest: "./dist/uploads",
		}),
	],
})
export class UserModule {}
