const addNotificationInfo =
  "INSERT INTO notification (userlost_id, userfound_id, question, answer, item_id, userlost_name, userlost_contact, userfound_name ) VALUES ($1 , $2 , $3 ,$4 ,$5 ,$6 ,$7 ,$8)";

const getNotif = "SELECT * FROM notification WHERE userlost_id = $1";

const removeNotif = "DELETE FROM notification WHERE id = $1";

const acceptNotif = "UPDATE notification SET accept = $1 WHERE id = $2";
module.exports = { addNotificationInfo, getNotif, removeNotif, acceptNotif };
