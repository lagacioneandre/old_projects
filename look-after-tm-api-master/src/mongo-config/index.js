const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost:27017/look_after_tm',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose;