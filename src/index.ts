import express, { json, urlencoded } from "express";
import productRoutes from './routes/products/index'


const app = express();
const port = 3000;


app.use(json());
app.use(urlencoded({extended: false}));
app.use(urlencoded());


app.use('/product', productRoutes);
app.listen(port, () => {
    console.log(`Server is listening in port ${port}... `)
})


