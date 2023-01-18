const express = require('express')
const router = express.Router()
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
// const {campgroundSchema} = require('../schemas.js')
// const Space = require('../models/spaces');
// const { exist } = require('joi')
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})
const {isLoggedIn, isAuthor, validateSpace} = require('../middleware');
const {index, renderNewForm, createSpace, showSpace, renderEditForm, updateSpace, deleteSpace} = require('../controllers/spaces');

router.route('/')
    .get(catchAsync(index))
    .post(isLoggedIn, upload.array('image'), validateSpace, catchAsync(createSpace))

    
router.get('/new', isLoggedIn, renderNewForm)

router.route('/:id')
    .get(catchAsync(showSpace))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateSpace, catchAsync(updateSpace))
    .delete(isLoggedIn, isAuthor, catchAsync(deleteSpace))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm))

module.exports = router;