const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
let expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: false 
});

async function sendNotification(pushToken, title, sound, body, data) {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return false; // Indica fallo
  }
  let message = {
    to: pushToken,
    sound: sound,
    body: body,
    data: data,
    title: title
  };

  try {
    let chunks = expo.chunkPushNotifications([message]);
    let tickets = [];
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    let receiptIds = tickets.map(ticket => ticket.id).filter(id => id);
    if (receiptIds.length > 0) {
      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

      for (let chunk of receiptIdChunks) {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === 'error') {
            console.error(`There was an error sending a notification: ${message}. Error code: ${details? details.error : 'N/A'}`);
            return false; // Indica fallo
          }
        }
      }
    }
    return true; // Indica éxito
  } catch (error) {
    console.error(error);
    return false; // Indica fallo
  }
}


module.exports = { sendNotification };