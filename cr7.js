//Create a Virtual Server and Pool on a BIG-IP LTM  
//Verify the new Virtual Server and Pool exist.
//Delete the Virtual Server and Pool 

var fs = require('fs');
var request = require('request');

//Do not verify certificates
var request = request.defaults({strictSSL: false, rejectUnauthorized: false});

//Your username, password, and the BIG-IP managment IP
var username = 'some_admin',
    password = 'some_password',
    mgmtUrl = 'xxx.xxx.xxx.xxx',  //Substitute the working management IP for your BIG-IP here 
    endpoint = mgmtUrl + '/mgmt/tm/',
    baseUrl = 'https://' + username + ':' + password + '@' + endpoint;

//The pool, pool-members, and virtual server to create
var pool = '~Common~pool_1',
    mbrs = 'ltm/pool/' + pool + '/members',
    m1 = mbrs + '/~Common~10.20.20.1:80',
    m2 = mbrs + '/~Common~10.20.20.2:80',
    m3 = mbrs + '/~Common~10.20.20.3:80',
    vs = '~Common~vs_1';

//Read input file and create resource using HTTP POST to iControl REST API
function addRsc(f, t, cb) {
    console.log('\nAdding resource specified in ' + f + ' to ' + t);
    fs.createReadStream(f).pipe(request.post(baseUrl + t))
   .on('error', function(err) {console.log(err)})
   .on('response', function(res) {console.log('STATUS: '+ res.statusCode)})
   .on('response', function(res) {cb()});
}

//Delete resource using HTTP DELETE to iControl REST API
function delRsc(t, cb) {
    console.log('\nDeleting resource: ' + t);
    request.del(baseUrl + t)
   .on('response', function(res) {console.log('STATUS: '+ res.statusCode)})
   .on('response', function(res) {cb()});
}

//Verify resource using HTTP GET to iControl REST API  
function getRsc(t, cb) {
    request(baseUrl + t, function(err, res, body) {
        if (!err && res.statusCode == 200) {
        console.log('\nChecking for presence of resource on the BIGIP ');
        console.log(body + '\n');
        cb();
       }
    });
}

function crVSaP(cb) { 
    addRsc('pool1.json', 'ltm/pool', function () {
        addRsc('member1.json', mbrs, function () {
            addRsc('member2.json', mbrs, function () {
                addRsc('member3.json', mbrs, function () {
                    addRsc('vserver.json', 'ltm/virtual', function () {             
                        console.log('\nFINISHED CREATING VIRTUAL SERVER AND SERVER POOL');
                        cb(); 
                    });
                });
            });
        });
    });
}

//Create resources 
function getVSaP(cb) {
    getRsc('ltm/virtual/' + vs + '/?$select=name', function () {
        getRsc(m3 + '/?$select=name', function () {
            getRsc(m2 + '/?$select=name', function () {
                getRsc(m1 + '/?$select=name', function () {
                    getRsc('ltm/pool/' + pool + '?$select=name', function () {
                        console.log('\nFINISHED CHECKING FOR PRESENCE OF VIRTUAL SERVER AND POOL');      
                        cb();
                    });
                });
            });
        });
    });
}

//Delete resources
function delVSaP(cb) {
    delRsc('ltm/virtual/' + vs, function () {
        delRsc(m3, function () {
            delRsc(m2, function () {
                delRsc(m1, function () {
                    delRsc('ltm/pool/' + pool, function () {                                    
                        cb();
                    });
                });
            });
        });
    });
}

//Verify resources
crVSaP(function () {
    getVSaP(function () {
        delVSaP(function () {
            logComplete();
        });
    });
});

//Log completion of sample
function logComplete() {
    console.log('\nFINISHED DELETING VIRTUAL SERVER AND POOL');
}