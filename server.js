import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './Routes/postRoutes.js';
import userRoutes from './Routes/userRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// app.use((req,res,next)=>{
//     console.log(req.path,req.method);
//     next();
// })

app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connection established");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

connectDB().then(()=>{
    app.listen(port, ()=> console.log(`server listening on port ${port}`));
}).catch(err => console.log(err.message));



export default app;