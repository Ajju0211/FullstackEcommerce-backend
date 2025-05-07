import { Request, Response } from "express"


export  const listProducts = async (req: Request, res: Response) => {

    res.send("list of products")
}

export  const getProductByID = async (req: Request, res: Response) => {
    res.send("Get all the Product by ID")
}

export  const createProduct = async (req: Request, res: Response) => {

    res.send('created product')
}

export  const updateProduct = async (req: Request, res: Response) => {
    res.send("update product")
}

export  const deleteProduct = async (req: Request, res: Response) => {
    res.send("delete product")
}
