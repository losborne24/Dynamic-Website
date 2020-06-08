const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	//res.render('home');
	res.render('contents');
});
router.get('/home', function (req, res) {
	res.json({ isShared: false });
});
router.get('/news', function (req, res) {
	//res.render('news');
	res.json({ isShared: true });
});
router.get('/squad', function (req, res) {
	//res.render('squad');
	res.json({ isShared: true });

});
router.get('/preseason', function (req, res) {
	//res.render('preseason');
	res.json({ isShared: true });

});
router.get('/college', function (req, res) {
	//res.render('college');
	res.json({ isShared: true });

});
router.get('/development', function (req, res) {
	//	res.render('development');
	res.json({ isShared: true });

});
router.get('/other', function (req, res) {
	//res.render('other');
	res.json({ isShared: true });

});
router.get('/login', function (req, res) {
	//res.render('login');
	res.json({ isShared: true });

});
router.get('/register', function (req, res) {
	//	res.render('register');
	res.json({ isShared: true });

});

module.exports = router;
