var Poem = require('../models/poemmodel');

module.exports.getPoems = function(req, res){
        console.log("Hello from controller");
        Poem.find({}, function(err, data){
            res.render("index.jade",{poems:data}) //pass poems to index.jade template so it can iterate it
        });
}
