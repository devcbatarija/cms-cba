require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const {
    API_KEY_IMGBB,
    BASE_URL
  } = process.env;
const FormData = require('form-data');


const uploadImage = async ({filePath,type}) => { //RECIBIMOS BASE64
    try {
        let data=[];
        let urlsComplet=[];
        if(type=="image"){
            for(let img of filePath){
                const bs=await formatImage(img)
                data.push(bs); 
            }
        }else{
            
        }
        for(let base of data){
            const formData = new FormData();
            formData.append('image', base)
            const response = await axios.post(
                `${BASE_URL}/upload?key=${API_KEY_IMGBB}`,
                formData,
                { 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if(response.data.success){
                urlsComplet.push(response.data.data.display_url);
                console.log(response.data.data)
                console.log(response.data.data.display_url)
            } else {
                throw new Error('La carga falló');
            }
        }
        return {message:"Las imagenes se subieron exitosamente",results:urlsComplet}
    } catch (error) {
        return error;
    }
};

const getImage = async (id) => {
    const response = await axios.get(`${API_KEY_IMGBB}/image/${id}`);
    return response.data;
};
const formatImage = (base) => {
    console.log("format")
    return new Promise((resolve, reject) => {
        try {
            const s = base.replace(/data:image\/(png|jpg|jpeg);base64,/, '');
            resolve(s);
        } catch (error) {
            reject(error);
        }
    })
}
const updateImage = async (id, filePath) => {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));
    const response = await axios.put(
        `${API_KEY_IMGBB}/image/${id}`,
        formData,
        { headers: formData.getHeaders() }
    );
  
    if (response.data.success) {
        return response.data.data.display_url;
    } else {
        throw new Error('Update failed');
    }
};

const deleteImage = async (id) => {
    const response = await axios.delete(`${API_KEY_IMGBB}/image/${id}`);

    if (response.data.success) {
        return 'Delete successful';
    } else {
        throw new Error('Delete failed');
    }
};

module.exports = { uploadImage, getImage, updateImage, deleteImage };
