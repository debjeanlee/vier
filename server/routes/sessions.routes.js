const router = require('express').Router();

router.post('/new', (req, res) => {
  res.send(201).json({ message: 'session created' });
});

module.exports = router;
