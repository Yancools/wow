const express = require('express');
const router = new express()

router.post('/send', (req, res) => {
    res.json({message: "Сообщение отправлено!"});
});

module.exports = router