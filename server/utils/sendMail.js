const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const {
  GMAIL_USER,
} = process.env;

const oauth2Client = new OAuth2(
  "285833738101-ftitdrvnbselq4gjddammgq3d1257lfu.apps.googleusercontent.com", // ClientID
  "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", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);




oauth2Client.setCredentials({
  refresh_token: "1//046ze15lqPsycCgYIARAAGAQSNwF-L9IrhLBozHD_DaUr5BVtDxHJYaya_jLCr4x849V6z447iQp3gaKbrIMlpAmy1BFBiiYh-RE"
});
const accessToken = oauth2Client.getAccessToken()



// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true, // use SSL
  // auth: {
  //   type: "OAuth2",
  //   user: GMAIL_USER,
  //   clientId: "285833738101-ftitdrvnbselq4gjddammgq3d1257lfu.apps.googleusercontent.com",
  //   clientSecret: "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",
  //   refreshToken: "1//046ze15lqPsycCgYIARAAGAQSNwF-L9IrhLBozHD_DaUr5BVtDxHJYaya_jLCr4x849V6z447iQp3gaKbrIMlpAmy1BFBiiYh-RE",
  //   accessToken: accessToken,
  //   expires: 1484314697598,
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: GMAIL_USER,
    clientId: "285833738101-ftitdrvnbselq4gjddammgq3d1257lfu.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//046ze15lqPsycCgYIARAAGAQSNwF-L9IrhLBozHD_DaUr5BVtDxHJYaya_jLCr4x849V6z447iQp3gaKbrIMlpAmy1BFBiiYh-RE",
    accessToken: accessToken,
    expires: 1484314697598,
    rejectUnauthorized: false //hmm not sure about this
  },
});

module.exports = async function (email, subjectLine, template) {
  // send mail with defined transport object
  await transporter.sendMail({
    from: GMAIL_USER, // sender address
    to: email, // receiver
    subject: subjectLine, // Subject line
    generateTextFromHTML: true,
    html: template, // html body
  }, (error, response) => {
    error ? console.log(error) : console.log(response);
     smtpTransport.close();
  });
};
