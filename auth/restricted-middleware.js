module.exports = (req, res, next) => {
  if (req.session && req.session.loggedin){
    next();
  } else {
    res.status(400).json({ message: "You shall not pass!" })
  }
}