import "reflect-metadata";
import {
  DataSource,
  DataSourceOptions,
} from "typeorm";
import { DataPoint } from "./entity/DataPoint";
import { Score } from "./entity/Score";

export const options: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "",
  database: "admin",
  entities: [DataPoint, Score],
  synchronize: true,
  logging: false,
};

const dataSource = new DataSource(options);

export const db = async (): Promise<DataSource> => {
  if (!dataSource.isInitialized) {
    console.log(`connecting to database: ${options.database}`);
    await dataSource.initialize();
  }
  return dataSource;
};