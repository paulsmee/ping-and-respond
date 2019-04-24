var ping = require('ping')
var player = require('play-sound')(opts = {})

let userIP = [
    {
        name:'Paul',
        ip:'8.8.8.8',
        status: false
    }, 
    {
        name:'Blake',
        ip:'192.168.1.55',
        status: false
    },
    {
        name:'Bethany',
        ip:'8.8.4.4',
        status: false
    }
]

// Obtain User IP Address
function listUserIP(users) {
    let userIPAddresses = []
    for (let i=0; i<users.length; i+=1) {
     userIPAddresses.push(users[i].ip)
    }
    return userIPAddresses
}
console.log(listUserIP(userIP))

// Obtain User Name (not used yet - hiding)
// function listUserName(names) {
//     let userNames = []
//     for (let i=0; i<names.length; i+=1) {
//         userNames.push(names[i].name)
//     }
//     return userNames
// }
// console.log(listUserName(userIP))

// Now we have two arrays we can pick data from userNames and userIPAddresses
// Next we find out if the host is alive and place that into an array to use 
// to call functions based on their alive status

listUserIP(userIP).forEach(function (user) {
    ping.sys.probe(user, function(isAlive){
        user.status = isAlive;
        console.log(userIP[0].status)
        })
    })

// if (aliveStatus.forEach( function (aliveStatus) {
// }) {
//     userFound()
// } else {
//     notFound()
// }

// function userFound(){
//     console.log('I have found ...')
//     player.play(user+'found.mp3', function(err){
//         if (err) throw err
//       })
// }

// function notFound(){
//     console.log('I cannot find ...')
//     player.play(user+'notfound.mp3', function(err){
//         if (err) throw err
//       })
// }
