import { Router } from "express";
import cartsDao from "../daos/cartDao.js";
import productsDao from "../daos/productDao.js";

export const route_carritos = Router();

const cartsContainer = cartsDao;
const productsContainer = productsDao;

// Endpoints Cart

route_carritos.get("/", async (req, res) => {
	res.json(await cartsContainer.getAll());
});

route_carritos.get("/:id", async (req, res) => {
	const cartId = req.params.id;
	const cart = await cartsContainer.getById(cartId);

	if (cart) {
		res.json(cart);
	} else {
		res.json({ error: "carrito no encontrado" });
	}
});

route_carritos.get("/:id/productos", async (req, res) => {
	const cartId = req.params.id;
	const cart = await cartsContainer.getById(cartId);

	if (cart) {
		res.json({ productos: cart.productos });
	} else {
		res.json({ error: "carrito no encontrado" });
	}
});

route_carritos.post("/", async (req, res) => {
	res.json(await cartsContainer.save(req.body));
});

route_carritos.post("/:id/productos", async (req, res) => {
	const cart = await cartsContainer.getById(req.params.id);
	const product = await productsContainer.getById(req.body.id);
	cart.productos.push(product);

	res.json(await cartsContainer.updateById(req.params.id, cart));
});

route_carritos.delete("/", async (req, res) => {
	res.send(await cartsContainer.deleteAll());
});

route_carritos.delete("/:id", async (req, res) => {
	const cartId = req.params.id;
	res.send(await cartsContainer.deleteById(cartId));
});

route_carritos.delete("/:id/productos/:id_prod", async (req, res) => {
	const cartId = req.params.id;
	const productId = req.params.id_prod;
	try {
		const cart = await cartsContainer.getById(cartId);
		const isInCart = await cart.productos.some(
			(producto) => producto._id.toString() === productId
		);

		if (isInCart) {
			cart.productos = cart.productos.filter(
				(producto) => producto._id.toString() !== productId
			);
			res.json(await cartsContainer.updateById(req.params.id, cart));
		} else {
			throw new Error(`El producto ${productId} no esta en el carrito`);
		}
	} catch (err) {
		throw new Error(`Error al eliminar producto: ${err}`);
	}
});