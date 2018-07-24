const express = require('express')
const app = express()

var session = require('express-session')
const sess = { secret: 'keyboard cat', cookie: {} }
app.use(session(sess))

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/express_session_example')
const User = require('./models/User')

app.get('/home', (req, res) => {
  if (!req.session.isLoggedIn) return res.send('Please login to view data.')
  return res.send('this is home page.')
})

app.get('/login', (req, res) => {
  const {username, password} = req.query
  if (!username || !password) return res.send('Please provide username and password.')
  User.find({username, password}, (err, docs) => {
    if (err) return res.send('Error in finding.')
    if (docs.length == 0) return res.send('Not Found user with this password.')
    req.session.isLoggedIn = true
    return res.send('Logged In.')
  })
})

app.listen(81, () => {
  console.log('Server is listening on port 81...');
})
