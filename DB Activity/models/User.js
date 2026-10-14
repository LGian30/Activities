const db = require("./db");

const FIELDS = [
  "fld_firstname",
  "fld_middlename",
  "fld_lastname",
  "fld_extname",
  "fld_username",
  "fld_email"
];

const User = {
  async all() {
    const [rows] = await db.execute("SELECT * FROM tbl_users");
    return rows;
  },

  async find(id) {
    const [rows] = await db.execute("SELECT * FROM tbl_users WHERE fld_id=?",[id]);
    return rows;
  }
}

module.exports = User;