const client = require("../../db");
const queries = require("./queries");

const addNotiInfo = (req, res) => {
  try {
    const { userlost_id, userfound_id, question, answer, item_id, userlost_name, userlost_contact, userfound_name } = req.body;
    console.log(req.body);
    client.query(
      queries.addNotificationInfo,
      [userlost_id, userfound_id, question, answer, item_id, userlost_name, userlost_contact, userfound_name ],
      (error, results) => {
        if (error) {
          console.log(error);
        }
        if (results.rowCount === 0) {
          console.log("No rows inserted.");
          res.status(500).send("No rows inserted");
          return;
        }
        res.status(200).send("Operation success");
      }
    );
  } catch (error) {
    res.send(error);
  }
};

const getNotif = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await client.query(queries.getNotif, [id]);
    if (result.rows[0]) {
      console.log(result.rows);
      res.status(200).send(result.rows);
    }
    else {
      res.send("No notifications");
    }
  } catch (error) {
    res.send(error);
  }
};

const removeNotif = async ( req, res) => {
  try {
    const id = req.params.id;
    console.log("The id is" ,id);
    const result = await client.query(queries.removeNotif , [id]);
    res.send("The notification has been removed!");
  } catch (error) {
    console.log(error);
  }
}

const acceptNotif = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const result = await client.query(queries.acceptNotif,[true, id]);
    res.send("Thank you for your cooperation. The person who found your item will be provided your contact details.")
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addNotiInfo, getNotif, removeNotif, acceptNotif };
