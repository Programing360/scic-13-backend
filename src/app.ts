import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";
import { globalErrorHandler } from "./lib/globalErrorHandler.js";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SCIC EJP-13 backend is running 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/review", reviewRoutes);

// 404 handler — কোনো route match না হলে
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

// সবার শেষে global error handler
app.use(globalErrorHandler);

export default app;
