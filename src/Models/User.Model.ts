import { DataTypes } from "sequelize";
import { sequelize } from "../Connection/Connection";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: { type: DataTypes.ENUM, values: ["User", "Admin","Theator-Admin","Director"], allowNull: false },
  },
  {
    timestamps: true,
  }
);


export { User };
