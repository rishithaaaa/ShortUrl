const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const {connectToMongoDb} = require("./connect");
const app = express();
const path = require("path");
const PORT = 8001;
const staticRouter = require("./routes/staticRouter");

connectToMongoDb("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("home", {
    urls: allUrls,
  });
});
app.use("/url", urlRoute);
app.use("/", staticRouter);
app.get("/url/:shortId", async (req, res) => {
  // console.log(req.params.shortId);
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // console.log(entry);
  res.redirect(entry.originalUrl);
});

app.listen(PORT, () => {
  console.log("Server Started");
});
