import { sequelize } from "../Connection/Connection";
import { DataTypes } from "sequelize";
import { User } from "./User.Model";

export const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rel_date: { type: DataTypes.DATE, allowNull: false },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  collections: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dir_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    references: { model: User, key: "id" },
  },
});
