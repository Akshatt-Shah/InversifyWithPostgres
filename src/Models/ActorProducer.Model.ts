import { sequelize } from "../Connection/Connection";
import { DataTypes } from "sequelize";

const ActorProducer = sequelize.define(
  "ActorProducer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Actor", "Producer"],
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export { ActorProducer };