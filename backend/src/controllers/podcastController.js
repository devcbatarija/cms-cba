const { Podcast } = require("../db");
const { uploadFile } = require("../services/aws_s3");
const { AWS_CLOUDFRONT } = require("../services/s3");
const { ClientError } = require("../utils/errors");
module.exports = {
  getPodcastsBd: async () => { 
      const response = await Podcast.findAll();
      return { results: response }; 
  },
  addPodcastAws: async (filePath) => {
      const result = await uploadFile(filePath);
      return result; 
  },
  addPodcastBd: async (podcast) => { 
    try {
      const obj = {
        epi_number: podcast.epi_number,
        description: podcast.description,
        authors: podcast.authors,
        url_cloudfront: AWS_CLOUDFRONT + podcast.url_cloudfront,
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
