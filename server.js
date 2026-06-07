import env from "./src/config/env.js";
import app from "./src/app.js";
import connectDB from "./src/config/connectDb.js";
connectDB(env.mongoUri);

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
