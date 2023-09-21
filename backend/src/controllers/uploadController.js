require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const {
    API_KEY_IMGBB,
    BASE_URL
  } = process.env;
const FormData = require('form-data');


// const API_KEY_IMGBB = 'https://api.imgbb.com/1';

const uploadImage = async (filePath,type) => { //RECIBIMOS BASE64
    console.log(filePath)
    try {
        const formData = new FormData();
        let data;
        if(type=="image"){
            data = await formatImage(filePath[0]);  //enviamos el base64 a formatear
        }else{
            
        }
        type=="image"?formData.append('image', data):formData.append('video', data); //cargamos al formData
        const response = await axios.post(
            `${BASE_URL}/upload?expiration=600&key=${API_KEY_IMGBB}`,
            formData,
            { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if(response.data.success){
            return response.data.data.display_url;
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        return error;
    }
};

const getImage = async (id) => {
    const response = await axios.get(`${API_KEY_IMGBB}/image/${id}`);
    return response.data;
};
const formatImage = (base) => {
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
