const mongoose = require('mongoose');
// require('dotenv').config({path: '.env.local'});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

mongoose.Promise = global.Promise;
console.log(process.env.HEROKU_MONGO_URI)
try {
	mongoose.connect(process.env.HEROKU_MONGO_URI);
} catch (e) {
	console.log(e);
}

module.exports = {
	mongoose
};
