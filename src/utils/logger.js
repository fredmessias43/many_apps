var log = console.log;
console.log = function(){
    // 1. Convert args to a normal array
    var args = Array.from(arguments);

    // Do your stuff
    // 2. Prepend log prefix log string
    // args.unshift(process.env.MIX_APP_ENV + " => ");
    
    const file = console.trace()
    // const file = (new Error).stack.split("\n");
    args.unshift( file + " => ");
    // 3. Pass along arguments to console.log
    log.apply(console, args);
}