import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.DB_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the DB_URL environment variable inside .env.local");
}

const uri: string = MONGODB_URI;


type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};


const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};


if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<Mongoose> {
  if (globalWithMongoose.mongoose!.conn) {
    return globalWithMongoose.mongoose!.conn;
  }

  if (!globalWithMongoose.mongoose!.promise) {
    globalWithMongoose.mongoose!.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    globalWithMongoose.mongoose!.conn = await globalWithMongoose.mongoose!.promise;
  } catch (error) {
    globalWithMongoose.mongoose!.promise = null;
    throw error;
  }

  return globalWithMongoose.mongoose!.conn;
}

export default connectDB;
