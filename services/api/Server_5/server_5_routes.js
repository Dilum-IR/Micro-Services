const {
  INSERT,
  UPDATE,
  SELECT,
  DELETE,
  QUERY,
  SELECT_WHERE,
} = require("../../models/Server_5_DB");
const express = require("express");
const router = express.Router();
router.post("/notification", (req, res) => {
  const title = req.body.name;
  const message = req.body.description;
  const type = req.body.type;

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Form the date in YYYY-MM-DD format
  const formattedDate = `${year}-${month}-${day}`;

  QUERY(
    "INSERT INTO notifications(title, Notification, issued_date, type ) VALUES ('" +
      title +
      "','" +
      message +
      "','" +
      formattedDate +
      "','" +
      type +
      "')"
  );

  res.send({
    type: "success",
    message: "Notification added successfully",
  });
});

router.get("/getnotification", (req, res) => {

  SELECT("notifications").then((response) => {
    res.send(response);
  });;
});

module.exports = router;
