function myInstanceOf(left,right){
    let rPrototype = right.prototype
    let lProto = Object.getPrototypeOf(left)
    while(true){
        if(lProto === rPrototype)   return true
        if(lProto === null) return false
        lProto = Object.getPrototypeOf(lProto)
    }
}