class Schedular{
    constructor(limit){
        this.limit = limit
        this.quene = []
        this.running = 0
    }
    task(fn){
        return new Promise((resolve,reject) => {
            this.quene.push(() => fn().then(resolve,reject))
            this.run()
        })
    }
    run(){
        if(this.running >= this.limit || !this.quene.length)    return
        const currTask = this.quene.shift()
        this.running ++
        currTask.fn()
        .then((res) => {
            console.log(res)
        })
        .catch((e) => reject(e))
        .finally(() => {
            this.running --
            this.run()
        })
    }
}