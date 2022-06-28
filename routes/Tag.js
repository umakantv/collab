const express = require("express");
const Controllers = require("../models/Tag/Controllers");
const baseHandler = require("../utils/baseHandler");

const router = express.Router({
    mergeParams: true
})

router.get('/tags', baseHandler(Controllers, 'getAll'));
router.put('/tag/:id', baseHandler(Controllers, 'put'));
router.delete('/tag/:id', baseHandler(Controllers, 'delete'));
router.post('/tag', baseHandler(Controllers, 'post'));


module.exports = router;