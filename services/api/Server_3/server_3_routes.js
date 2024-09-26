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
  let { user, amount } = req.body;

  QUERY(
    "INSERT INTO bill_table(user_id,amount,is_payed) VALUES('" +
      user +
      "','" +
      amount +
      "','" +
      1 +
      "')"
  ).then((response) => {
    console.log(response);
    res.send("success");
  });
});
module.exports = router;
