const { uploadImage } = require("../controllers/uploadController")

module.exports={
    uploadImage:async(req,res) => {

        try {
            const result = await uploadImage(req.body.filePath,req.body.type);
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(401).json({error:error.message})
        }
    }
}