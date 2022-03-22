import { Router } from "express";
import productsDao from "../daos/productDao.js";

export const route_productos = Router();

const productsContainer = productsDao;

let administrador = true;

const authError = (req) => ({
	error: -1,
	description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`,
});

// Endpoints products
route_productos.get("/", async (req, res) => {
	res.json(await productsContainer.getAll());
});

route_productos.get("/:id", async (req, res) => {
	const productId = req.params.id;
	const product = await productsContainer.getById(productId);
	console.log("product:", product);
	if (product) {
		res.json(product);
	} else {
		res.json({ error: "producto no encontrado" });
	}
});

route_productos.post("/", async (req, res) => {
	if (administrador) {
		res.json(await productsContainer.save(req.body));
	} else {
		res.send(authError(req));
	}
});

route_productos.put("/:id", (req, res) => {
	const productId = req.params.id;
	if (administrador) {
		productsContainer.updateById(productId, {
			...req.body,
		});
		res.send(productsContainer.getById(productId));
	} else {
		res.send(authError(req));
	}
});

route_productos.delete("/:id", async (req, res) => {
	const productId = req.params.id;
	administrador
		? res.send(await productsContainer.deleteById(productId))
		: res.send(authError);
});

route_productos.delete("/", async (req, res) => {
	if (administrador) {
		res.send(await productsContainer.deleteAll());
	} else {
		res.send(authError(req));
	}
});