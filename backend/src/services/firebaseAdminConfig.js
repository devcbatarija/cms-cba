var admin = require("firebase-admin");

var serviceAccount = require("../../cba-students-firebase-adminsdk-xci4c-d2bcea50b0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const tokenFCM ="ExponentPushToken[NePjpqG-qy9fzYHUXjVVrQ]";

function sendNotificationToDevice(payload) {
  var message = {
    data: payload,
    token: tokenFCM,
  };

  admin.messaging().send(message)
   .then((response) => {
      console.log('Successfully sent message:', response);
    })
   .catch((error) => {
      console.log('Error sending message:', error);
    });
}
module.exports = admin;