var ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");
const express = require("express");
const router = express.Router();
const path = require("path");

var toneAnalyzer = new ToneAnalyzerV3({
  version_date: "2017-09-21",
  iam_apikey: "9NdKLtkwlOJBiaQusKp8k65AhhqLfenBkDPm6Oy96xy2",
  url: "https://gateway-syd.watsonplatform.net/tone-analyzer/api"
});

router.get("/", (req, res, err) => {
  res.sendFile(path.join(global.rootDir, "views", "index.html"));
});

router.post("/", (req, res, err) => {
  var text = req.body.text;

  var toneParams = {
    tone_input: { text: text },
    content_type: "application/json"
  };

  toneAnalyzer.tone(toneParams, function(error, toneAnalysis) {
    if (error) {
      res.json(err);
    } else {
      res.json(toneAnalysis);
    }
  });
});

module.exports = router;