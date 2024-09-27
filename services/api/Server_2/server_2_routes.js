const {
  INSERT,
  UPDATE,
  SELECT,
  DELETE,
  QUERY,
  SELECT_WHERE,
} = require("../../models/Server_2_DB");
const express = require("express");
const router = express.Router();
const { SendMail } = require("../../include/NodemailerConfig");
const axios = require("axios");

router.post("/addpackage", async (req, res) => {
  const PK_name = req.body.name;
  const PK_des = req.body.description;
  const PK_data = req.body.data;
  const PK_voice = req.body.voice;
  const PK_sms = req.body.sms;
  const PK_price = req.body.price;
  const PK_type = req.body.type;

  // Handle invalid values
  const dataLimit = isNaN(parseFloat(PK_data)) ? 0 : parseFloat(PK_data);
  const voiceLimit = isNaN(parseInt(PK_voice)) ? 0 : parseInt(PK_voice);
  const smsLimit = isNaN(parseInt(PK_sms)) ? 0 : parseInt(PK_sms);
  const price = isNaN(parseInt(PK_price)) ? 0 : parseInt(PK_price);

  QUERY(
    "INSERT INTO package(name,description,type,data_limit,voice_limit,sms_limit,price) VALUES ('" +
      PK_name +
      "','" +
      PK_des +
      "','" +
      PK_type +
      "','" +
      dataLimit +
      "','" +
      voiceLimit +
      "','" +
      smsLimit +
      "','" +
      price +
      "')"
  );

  const userResponse = await axios.get("http://localhost:5001/api/customers");
  const users = userResponse.data;

  for (const user of users) {
    await SendMail(2, "", user.email, [
      PK_name,
      PK_des,
      PK_type,
      dataLimit,
      voiceLimit,
      smsLimit,
      price,
    ]);
  }
  res.send({
    type: "success",
    message: "Package added and notifications sent to users",
  });
});

router.get("/getallpackages", (req, res) => {
  QUERY("SELECT * FROM package").then((response) => {
    res.send(response);
  });
});

router.post("/activatepackage", async (req, res) => {
  let { user, id } = req.body;
  //console.log(id)
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + 30);
  // Extract the year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 as months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  const year_2 = futureDate.getFullYear();
  const month_2 = String(futureDate.getMonth() + 1).padStart(2, "0"); // Adding 1 as months are zero-indexed
  const day_2 = String(futureDate.getDate()).padStart(2, "0");
  // Form the date in YYYY-MM-DD format
  const formattedDate = `${year}-${month}-${day}`;
  const formattedDate_2 = `${year_2}-${month_2}-${day_2}`;
  //var thirty_days_from_now = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  //console.log(formattedDate_2);
  QUERY(
    "INSERT INTO user_package(package_id,user_id,activated_date,expiration_date) VALUES('" +
      id +
      "','" +
      user +
      "','" +
      formattedDate +
      "','" +
      formattedDate_2 +
      "')"
  ).then((response) => {
    res.send("success");
  });
  //res.send('success');
});
module.exports = router;
