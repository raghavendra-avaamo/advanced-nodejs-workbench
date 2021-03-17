// crypto is a standard library in node
// load crypto
const crypto = require('crypto')

const start = Date.now()

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('LOG 1:', Date.now() - start)
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('LOG 2:', Date.now() - start)
})

/* 
EXAMPLE OUTPUT:
LOG 2: 538
LOG 1: 544
*/

/* 
NOTE: 
- both of the above functions are started at about the same time
- node does not wait for the first function call to be done before starting the second one
- so both console.logs measure from the same start point in time
*/

/* 
NOTE:
- though NodeJS is called single-threaded, only the Event-Loop is single-threaded
- libuv provides a 4-thread pool to NodeJS for more computationally intesive tasks
    - libuv is a C library
    - it provides asynchronous I/O which are based on event-loops 
    - NodeJS REPL is the event-loop that libuv supports
*/

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('LOG 3:', Date.now() - start)
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('LOG 4:', Date.now() - start)
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('LOG 5:', Date.now() - start)
})

/*
EXAMPLE OUTPUT:
LOG 2: 599
LOG 4: 605
LOG 1: 605
LOG 3: 605
LOG 5: 1181
*/