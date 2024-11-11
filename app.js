const express = require("express");
const postRouter = require("./api/routers");

const app = express();
app.use(express.json());

app.use("/posts", postRouter);
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`the application is running http://localhost:${PORT}`);
});
