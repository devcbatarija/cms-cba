const {
  getPodcastsBd,
  addPodcastAws,
  addPodcastBd,
} = require("../controllers/podcastController");
const fs = require("fs");
const { response } = require("../utils");

module.exports = {
  getPodcastsBd: async (req, res) => {
    const result = await getPodcastsBd();
    response(res, 200, result);
  },
  addPodcastAws: async (req, res) => {
    const filePath = req.files.media;
    const result = await addPodcastAws(filePath);
    fs.unlink(filePath.tempFilePath, (err) => {
      if (err)
        console.error(
          `Error deleting temp file ${filePath.tempFilePath}:`,
          err
        );
    });
    response(res, 200, result);
  },
  addPodcastBd: async (req, res) => {
      const result = await addPodcastBd(req.body);
      response(res,200,result)
  },
};
