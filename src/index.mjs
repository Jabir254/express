import express from "express";
import userRouters from "./routes/users.mjs";
import produtRouters from "./routes/products.mjs";

const app = express();

app.use(express.json());
app.use(userRouters);
app.use(produtRouters);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
