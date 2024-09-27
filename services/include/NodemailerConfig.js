var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "sritelcommunications@gmail.com",
    pass: "rbyyouxkygpabtlw",
  },
  tls: {
    rejectUnauthorized: false,
  },
  secure: false,
});
async function SendMail(otp, password, email, pack = []) {
  return new Promise((resolve, reject) => {
    // users fo notifiy when new sevice packages is added
    if (otp === 2) {
      console.log("pack");
      console.log(pack);

      var mailOptions = {
        from: "sritelcommunications@gmail.com",
        to: email,
        subject: "Exciting New Sri Care Packages Just for You!",
        text: `Dear Customer,\n\nA new service package - ${pack[0]} has been added to Sri Care.
		\nPackage Details: 
		\nName: ${pack[0]} 
		\nType: ${pack[2]}
		\nData Limit: ${pack[3]} GB
		\nVoice Limit: ${pack[4]} minutes
		\nSMS Limit: ${pack[5]} messages
		\nPrice: LKR ${pack[6]}\n\nPlease login to your account to view the new package. Try it now! We hope you find these new packages valuable. Should you have any questions, feel free to reply to this email or contact our support team.
		\n\nThank you for choosing Sri Care! We look forward to keeping you connected.`,
      };
    } else if (otp) {
      var mailOptions = {
        from: "sritelcommunications@gmail.com",
        to: email,
        subject: "Verify your email",
        text: `Your OTP is ${otp} Account created successfully Your Password is "${password}"`,
      };
    } else {
      var mailOptions = {
        from: "sritelcommunications@gmail.com",
        to: email,
        subject: "Verify your email",
        text: `Account created successfully Your Password is "${password}"`,
      };
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve("error");
      } else {
        resolve("emailsent");
      }
    });
  });
}
module.exports = { SendMail };
