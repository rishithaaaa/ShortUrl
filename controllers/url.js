const uid = require("shortid");
const URL = require("../models/url");
async function GenerateNewShortURL(req, res) {
  if (!req.body.url) return res.status(400).json({error: "Url is required"});
  // const shortUniqueId = Math.random().toString(36).slice(-6);
  const shortUniqueId = uid.generate();
  console.log(shortUniqueId);
  await URL.create({
    shortId: shortUniqueId,
    originalUrl: req.body.url,
    visitHistory: [],
  });
  return res.render("home", {id: shortUniqueId});
  // return res.json({id: shortUniqueId});
}
async function GenerateAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });

  return res.json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {GenerateNewShortURL, GenerateAnalytics};
