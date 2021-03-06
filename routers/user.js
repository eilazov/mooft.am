const express = require('express'),
    router = express.Router(),
    {body, query} = require('express-validator'),

	checkError = require('../middlewares/checkError'),
    controller = require('../controllers/user'),
    validator = require('../utils/validator')

router.post('/reg',[
    body('username', 'String from 4 characters to 20')
        .isLength({min: 4, max: 20})
        .not().custom(val => validator.exists('User', {username: val}))
        .withMessage('username already exists'),
    body('fullname', 'String from 5 to 50 characters')
        .isLength({min: 5, max: 50}),
    body('age', 'Integer, min 18')
        .isInt({min: 18}),
    body('gender', 'Can take one of the following values: "m", "f"')
        .optional()
        .isIn(['m', 'f']),
    body('phone', 'Valid phone number')
        .isInt(),
    body('password', 'String, min 6 characters')
        .isLength({min:6})
], checkError, controller.reg);

router.post('/login', [
	body('username', 'This property can not be empty')
        .not()
        .isEmpty(),
	body('password', 'This property can not be empty')
        .not()
        .isEmpty()
], checkError, controller.auth)

router.get('/check', controller.check)

router.get('/getUser',
		query('id', 'This field must be valid Object ID of following models: User')
			.not().isEmpty().bail()
			.isMongoId().bail()
			.custom(val => validator.exists('User', {_id: val})),
		controller.getUser)

router.get('/logout', controller.logout)
module.exports = router;
