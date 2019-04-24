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
// function listUserIP(users) {
//     let userIPAddresses = []
//     for (let i=0; i<users.length; i+=1) {
//      userIPAddresses.push(users[i].ip)
//     }
//     return userIPAddresses
// }
// console.log(listUserIP(userIP))

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

// let's loop over the array directly
// userIP.forEach(function (user) {
//     ping.sys.probe(user.ip, function(isAlive){
//         user.status = isAlive;   
//     })        
// })

// the code above is "async" - so the log line below is called before it finishes
// console.log(userIP);

async function start() {
    for (const user of userIP) {
        console.log(`Starting to ping ${user.name}...`);
        const resp = await ping.promise.probe(user.ip);
        user.status = resp.alive;
        console.log(`Finished pinging ${user.name}...`);
    }
}

async function convertingCallbackToPromiseManually() {
    for (const user of userIP) {
        const isAlive = await new Promise((resolve) => {
            ping.sys.probe(user.ip, function (isAlive) {
                return resolve(isAlive);
            })      
        })
        user.status = isAlive;
    }    
}

async function allAtOnce() {
    return Promise.all(userIP.map(async (user) => {
        console.log(`Starting to ping ${user.name}...`)
        const resp = await ping.promise.probe(user.ip);
        user.status = resp.alive;
        console.log(`Finished pinging ${user.name}...`)
    }))
}

console.time('start')
start().then(() => {
    console.timeEnd('start')
    console.log(userIP);
});

// start().then((val) => {
//     console.log(val);
// })

//     console.log(userIP)
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
