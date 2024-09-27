const {
  INSERT,
  UPDATE,
  SELECT,
  DELETE,
  QUERY,
  SELECT_WHERE,
} = require("../../models/Server_3_DB");
const express = require("express");
const router = express.Router();
router.post("/addtobill", (req, res) => {
  let { user, amount,is_paid } = req.body;

  
  const currentDate = new Date();
  // Extract the year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 as months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  QUERY(
    "INSERT INTO bill_table(user_id,amount,is_payed,issue_date) VALUES('" +
      user +
      "','" +
      amount +
      "','" +
      is_paid +
      "','" +
      formattedDate +
      "')"
  ).then((response) => {
    res.send("success");
  });
});

router.post("/getbills", (req, res) => {
  let { user, amount } = req.body;

  SELECT_WHERE("bill_table", "user_id", user).then((response) => {
    res.send(response);
  });
});

module.exports = router;
