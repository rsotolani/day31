import mongoose from "mongoose"

async function connect() {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI)
    }
    catch (error) {
        console.log(error);
    }
}

export default connect