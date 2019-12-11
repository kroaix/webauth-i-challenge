const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel.js");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  try {
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  req.session.loggedin = false;
  try {
    const user = await Users.findBy({ username })
    .first()
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggedin = true;
      res.json({ message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch {
    res.status(500).json({ message: "You shall not pass!" });
  }
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out.')
      } else {
        res.send('Successfully logged out.')
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
