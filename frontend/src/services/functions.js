export const handleUpload = (files) => {
    return new Promise((resolve, reject) => {
      try {
        const arrayBase = [];
        const formData = new FormData();
        const filesArray = Array.from(files);
        
        for (const file of filesArray) {
          // Convertir el archivo a base64
          const base64Image =  convertFileToBase64(file);
          arrayBase.push(base64Image);
  
          // Agregar el archivo a FormData
          formData.append('files', file);
        }
  
        resolve(arrayBase);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };