
console.log("start");

setTimeout(()=>{
    console.log("time");
})

setImmediate(()=>{
    console.log("setIMeediate");
})

process.nextTick(()=>{
    console.log("start process.nexttick");
})

console.log("end");
