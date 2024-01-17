import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
	name: string;
	surname: string;
	groupNumber: string;
	filePath: string;
}

@Table({ tableName: "user" })
export class User extends Model<User, UserCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;
	@Column({ type: DataType.STRING, allowNull: false })
	name: string;
	@Column({ type: DataType.STRING, allowNull: false })
	surname: string;
	@Column({ type: DataType.STRING, allowNull: false })
	groupNumber: string;
	@Column({ type: DataType.STRING, allowNull: false })
	filePath: string;
	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	price: number;
	@Column({ type: DataType.STRING, defaultValue: "ожидает принятия" })
	status: string;
}
