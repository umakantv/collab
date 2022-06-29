const express = require("express");
const Controllers = require("../models/Blog/Controllers");
const baseHandler = require("../utils/baseHandler");

const router = express.Router({
    mergeParams: true
})

router.get('/blogs', baseHandler(Controllers, 'getAll'));
router.put('/blog/:id', baseHandler(Controllers, 'put'));
router.delete('/blog/:id', baseHandler(Controllers, 'delete'));
router.post('/blog', baseHandler(Controllers, 'post'));


module.exports = router;