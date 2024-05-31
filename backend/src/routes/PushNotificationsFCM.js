const express = require("express");
const { StudentTokenFirebase,Notification } = require("../db");
const { catchedAsync } = require("../utils");
const { ClientError } = require("../utils/errors");
const response = require("../utils/response");
const admin = require("../services/firebaseAdminConfig");
const { sendNotification } = require("../services/expoNotificationsConfig");
const { io, getSocketIoInstance } = require("../webSocket/webSockets");
const router = express();

router.post('/create/default/notification',catchedAsync(async (req,res)=>{
  console.log("first")
  const { title, body, sound, data, tipo } = req.body;
  try {
    const result = await Notification.create({ title, body, sound, data, tipo });
    response(res,200,result)
  } catch (error) {
    console.log(error)
    throw new ClientError("Error al crear la notificación",401)
  }
}));
router.get('/list/notifications',catchedAsync(async (req,res)=>{
  try {
    const result = await Notification.findAll();
    response(res,200,result)
  } catch (error) {
    console.log(error)
    throw new ClientError("Error al crear la notificación",401)
  }
}));
router.delete('/delete/tokenfcm', catchedAsync(async (req,res)=>{
  const { idToken } = req.body;
  try {
    const obj = await StudentTokenFirebase.findByPk(idToken);
    const result = await obj.destroy();
    response(res,200,result)
  } catch (error) {
    throw new ClientError("Error al borrar el token FCM",401)
  }
}));
router.post(
  "/global/send",
  catchedAsync(async (req, res) => {
    const { title, body } = req.body;
    const allTokens = await StudentTokenFirebase.findAll();
    if (allTokens.length === 0) {
      throw new ClientError(
        "No hay tokens de estudiantes en la base de datos",
        400
      );
    }
    const tokens = allTokens.map((token) => token.tokenFCM);
    const message = {
      notification: {
        title,
        body,
      },
      tokens,
    };
    try {
      const messagesResponse = await admin
        .messaging()
        .sendEachForMulticast(message);
      const failureCount = messagesResponse.failures.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
      response(
        res,
        200,
        "Notificaciones enviadas",
        messagesResponse.responses,
        failureCount
      );
    } catch (error) {
      console.error(error);
      response(res, 500, "Error al enviar notificaciones", {}, error.message);
    }
  })
);
router.post("/global/expo/send", catchedAsync(async (req, res) => {
  const { title, sound, body, data } = req.body;
  const allTokens = await StudentTokenFirebase.findAll();
  if (allTokens.length === 0) {
    throw new ClientError("No hay tokens de estudiantes en la base de datos", 400);
  }
  const tokens = allTokens.map((token) => token.tokenFCM);
  let successCount = 0;
  try {
    for (const token of tokens) {
      const success = await sendNotification(token, title, sound, body, { withSome: data });
      if (success) {
        successCount++;
      }
    }
    response(res, 200, `${successCount} notificaciones enviadas`);
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al enviar notificaciones", 401);
  }
}));

router.post("/personal/send", (req, res) => {
  const { title, body, token } = req.body;
  const message = {
    title:title,
    body:body
  }; 
  const io =getSocketIoInstance();
  io.emit(token, message);
  response(res, 200, "Notificación enviada");
});

router.post("/fcm/token/save",catchedAsync(async (req, res) => {
    const tokenFCM = req.body;
    try {
      const searchAll = await StudentTokenFirebase.findAll();
      const searchToken = searchAll.find(
        (element) => element.tokenFCM === tokenFCM.tokenFCM
      );
      if (searchToken) {
        response(res, 400, "El token ya le pertenece a otro usuario!");
      }else{
        const result = await StudentTokenFirebase.create(tokenFCM);
        response(res, 200, "Token guardado", result);
      }
    } catch (error) { 
      throw new ClientError("Error al guardar el token", 401);
    }
  })
);

module.exports = router;
