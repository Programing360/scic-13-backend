import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
const app = express();
app.use(cors);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SCIC EJP-13 backend is running 🚀");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
export default app;
