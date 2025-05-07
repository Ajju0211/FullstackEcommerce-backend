import express, {  urlencoded } from "express";
import productRoutes from './routes/products/index'


const app = express();
const port = 3000;

app.use(express.json());
app.use(urlencoded({extended: false}));

app.use('/products', productRoutes);
app.listen(port, () => {
    console.log(`Server is listening in port ${port}... `)
})


