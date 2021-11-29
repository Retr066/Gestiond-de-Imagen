import mongoose from "mongoose";
import config from "./utils/config";
const MONGO_URI: string = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@api-rest.wgx87.mongodb.net/${config.MONGO_DATEBASE}?retryWrites=true&w=majority`;
(async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log("databse is connect to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
