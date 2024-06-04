import { sequelize } from "../Connection/Connection";
import { DataTypes } from "sequelize";
import { User } from "./User.Model";

const Theator = sequelize.define(
  "Theator",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true,primaryKey:true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    ownerId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  },
  {
    timestamps: true,
  }
);

export { Theator };