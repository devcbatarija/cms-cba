export const handleUpload = (files) => {
  return new Promise((resolve, reject) => {
    try {
      const arrayBase = [];
      const formData = new FormData();
      const filesArray = Array.from(files);

      for (const file of filesArray) {
        // Convertir el archivo a base64
        const base64Image = convertFileToBase64(file);
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
export const calcularTimestate = (fecha) =>{
  let fechaActual = new Date();
  let fechaComparacion = new Date(fecha);
  let diferencia = fechaActual - fechaComparacion;
    
  let segundos = Math.floor(diferencia / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);
  let dias = Math.floor(horas / 24);
  let meses = Math.floor(dias / 30);
  let años = Math.floor(meses / 12);
  let tiempoTranscurrido;
  if (segundos < 60) {
      tiempoTranscurrido = `${segundos} segundos`;
  } else if (minutos < 60) {
      tiempoTranscurrido = `${minutos} minutos`;
  } else if (horas < 24) {
      tiempoTranscurrido = `${horas} horas`;
  } else if (dias < 30) {
      tiempoTranscurrido = `${dias} días`;
  } else if (meses < 12) {
      tiempoTranscurrido = `${meses} meses`;
  } else {
      tiempoTranscurrido = `${años} años`;
  }
  return(`Hace ${tiempoTranscurrido} aproximadamente`);
  }