import express, {  urlencoded } from "express";
import productRoutes from './routes/products/index'
import authRoutes from './routes/auth';

const app = express();
const port = 3000;

app.use(express.json());
app.use(urlencoded({extended: false}));

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.listen(port, () => {
    console.log(`Server is listening in port ${port}... `)
})


