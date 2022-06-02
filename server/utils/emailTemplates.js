module.exports.confirmationEmailTemplate = function (url) {
  return `
  <div style="
      max-width: 500px;
      margin: 20px auto;
      background-color: #f4f3ff;
      color: inherit;
      padding: 40px 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    "
  >
    <h2>Thanks for signing up</h2>
    <p style="font-size: 20px; margin-bottom: 30px; text-align: justify;">
      Please click on below link to confirm your email.
    </p>
    <a style="
        background-color: #119cec;
        font-size: 18px;
        color: #fff;
        padding: 10px;
        font-family: sans-serif;
      "
      href=${url}
    >
      Confirm Email
    </a>
  </div>
    `;
};

module.exports.resetPasswordEmailTemplate = function (url) {
  return `
    <div style="
        max-width: 500px;
        margin: 20px auto;
        background-color: #f4f3ff;
        color: inherit;
        padding: 40px 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      "
    >
      <center><h2>Requested password reset?</h2></center>
      <p style="font-size: 20px; margin-bottom: 30px; text-align: justify;">
        If you requested password reset for your account then click on below
        link to reset your password. If you didn't make this request, ignore
        this email.
      </p>
      <center>
        <a style="
          background-color: #119cec;
          font-size: 18px;
          color: #fff;
          padding: 10px;
          font-family: sans-serif;
        "
        href=${url}
        >
          Reset Password
        </a>
      </center>
    </div>
    `;
};
