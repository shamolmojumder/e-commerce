import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to the mongodb ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error found in mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;