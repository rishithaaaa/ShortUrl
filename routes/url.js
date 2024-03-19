const express = require("express");
const {GenerateNewShortURL, GenerateAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/", GenerateNewShortURL);

router.get("/analytics/:shortId", GenerateAnalytics);

module.exports = router;
