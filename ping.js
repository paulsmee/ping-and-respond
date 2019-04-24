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

async function start() {
    for (const user of userIP) {
        console.log(`Starting to ping ${user.name}...`);
        const resp = await ping.promise.probe(user.ip);
        user.status = resp.alive;
        console.log(`Finished pinging ${user.name}...`);
    }
}

// async function convertingCallbackToPromiseManually() {
//     for (const user of userIP) {
//         const isAlive = await new Promise((resolve) => {
//             ping.sys.probe(user.ip, function (isAlive) {
//                 return resolve(isAlive);
//             })      
//         })
//         user.status = isAlive;
//     }    
// }

// async function allAtOnce() {
//     return Promise.all(userIP.map(async (user) => {
//         console.log(`Starting to ping ${user.name}...`)
//         const resp = await ping.promise.probe(user.ip);
//         user.status = resp.alive;
//         console.log(`Finished pinging ${user.name}...`)
//     }))
// }

console.time('start')
start().then(() => {
    console.timeEnd('start')
    console.log(userIP);
});

for (var k in userIP){
    if (typeof userIP[k] !== 'function') {
         alert("Key is " + k + ", value is" + userIP[k]);
    }
}
if (userIP.status) {
    userFound()
} else {
    notFound()
}

function userFound(){
    console.log('I have found ...')
    player.play(user+'found.mp3', function(err){
        if (err) throw err
      })
}

function notFound(){
    console.log('I cannot find ...')
    player.play(user+'notfound.mp3', function(err){
        if (err) throw err
      })
}
