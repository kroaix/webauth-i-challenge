const router = require('express').Router();

const Users = require('./usersModel.js');

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "You shall not pass!" });
  }
})

module.exports = router;
