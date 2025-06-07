import moongose from "mongoose";

export async function connectDB() {
  try {
    const dbConn = await moongose.connect(process.env.MONGODB_URL as string);
    console.log(`Connected with database: ${dbConn.connection.host}`);
  } catch (error) {
    console.log(`Error in database connection ${error}`);
  }
}
