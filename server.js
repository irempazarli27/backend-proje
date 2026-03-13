require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const limiter = require("./middleware/rateLimiter");
const uploadRoutes = require("./routes/uploadRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app =express();

app.use(cors({
  origin: "*"
}));

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend API running 🚀" });
});

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(limiter);

app.use(authRoutes);
app.use(movieRoutes);
app.use("/api", uploadRoutes);
app.use(reviewRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


