import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user/user.model";
import { OperatorModule } from './operator/operator.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		SequelizeModule.forRoot({
			dialect: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "TrWbZIRJZg",
			database: "print_helper",
			models: [User],
			autoLoadModels: true,
		}),
		UserModule,
		OperatorModule,
	],
})
export class AppModule {}
