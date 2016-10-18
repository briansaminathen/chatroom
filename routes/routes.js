// we will store all our users inside this users array
var users = [];
var messages = [];

var is_user = function (user) {
    var users_count = users.length;

    for (var i = 0; i < users_count; i++) {
        if (user === users[i]) {
            return true;
        }
    }
    return false;
};


module.exports = function Routes(app, server) {

    // this gets the socket.io module
    var io = require('socket.io').listen(server);



    io.sockets.on('connection', function (socket) {
        // all socket code goes in here
        socket.on('page-load', function (data) {
            if(is_user(data.user) === true) {
                socket.emit('existing-user', {error: 'This user already exists'})
            } else {
                users.push(data.user);
                console.log(users);
                socket.emit('load-messages', {current_user: data.user, messages: messages});
            }
        });

        socket.on('new_message', function (data) {
            console.log(data);
            messages.push({name: data.user, message: data.message});
            io.emit('post_new_message', {new_message: data.message, user: data.user});

        })

    })

     // root route to render index.ejs
    app.get('/', function(req, res) {
        res.render('index');
    })

}