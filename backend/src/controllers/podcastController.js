const { Podcast } = require("../db");
const { uploadFile } = require("../services/aws_s3"); 
const {
  AWS_CLOUDFRONT
}=require('../services/s3');
module.exports = {
  getPodcastsBd: async () => {
    try {
      const response = await Podcast.findAll();
      if (!response) {
        throw new Error("Couldn't find");
      }
      return { results: response };
    } catch (error) {
      throw error;
    }
  },
  addPodcastAws: async (filePath) => {
    try {
      const result = await uploadFile(filePath); 
      return result;
    } catch (error) { 
      throw error;
    }
  },
  addPodcastBd: async (podcast) => {
    console.log(podcast)
    try {
      const obj = {
        epi_number: podcast.epi_number,
        description: podcast.description,
        authors: podcast.authors,
        url_cloudfront: AWS_CLOUDFRONT+podcast.url_cloudfront,
        image: podcast.image,
        state: podcast.state,
        UsuarioIdUsuario: podcast.UsuarioIdUsuario,
      };
      const result = await Podcast.create(obj); 
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
