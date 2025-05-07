import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable
 } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [products] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!products) {
      res.status(400).json("Product Not Found!");
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createProduct = async (req: Request, res: Response) => {

  try {
    const data: any = req.body.cleanBody;
    console.log(data)
    const [product] = await db
      .insert(productsTable)
      .values(data)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log(id)
    const updateFields = req.body.cleanBody;
 
    const [product] = await db
      .update(productsTable)
      .set(updateFields)
      .where(eq(productsTable.id, id)).returning();
      console.log(product)
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product was not found!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [deleteProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (deleteProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product was not found!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  res.send("delete product");
};
