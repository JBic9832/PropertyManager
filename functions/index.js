const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addUserDocument = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  await admin.firestore().collection("users").doc(email).set({
    email,
  });
});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
