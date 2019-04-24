var player = require('play-sound')(opts = {})

var audio = player.play('foo.mp3', function(err){
    if (err && !err.killed) throw err
})
audio.kill()