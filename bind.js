function myBind(ctx, ...args){
    const fn = this
    return function(...rest) {
        return fn.apply(ctx, [...args, ...rest])
    }
}