const express = require("express");
const Controllers = require("../models/Category/Controllers");
const baseHandler = require("../utils/baseHandler");

const router = express.Router({
    mergeParams: true
})

router.get('/categories', baseHandler(Controllers, 'getAll'));
router.put('/category/:id', baseHandler(Controllers, 'put'));
router.delete('/category/:id', baseHandler(Controllers, 'delete'));
router.post('/category', baseHandler(Controllers, 'post'));


module.exports = router;