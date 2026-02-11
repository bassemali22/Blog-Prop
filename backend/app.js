const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./config/connectToDb");
const { errorHandler, notFound } = require("./middlewares/error");
connectDb();
const app = express();

app.use(express.json());

// cors policy
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`server is running in${process.env.NODE_ENV} on port${PORT}`)
);
