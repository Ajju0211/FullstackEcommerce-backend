import express, {  urlencoded } from "express";
import productRoutes from './routes/products/index.js'
import authRoutes from './routes/auth/index.js';
import cookieParser from 'cookie-parser';
import ordersRoutes from './routes/orders/index.js'
const app = express();
const port = 3000;

app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);

app.listen(port, () => {
    console.log(`Server is listening in port ${port}... `)
})


