import express from "express";
import userRouters from "./routes/users.mjs";

const app = express();

app.use(express.json());
app.use(userRouters);

const PORT = process.env.PORT || 3000;

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "Tomato", price: 345 }]);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
