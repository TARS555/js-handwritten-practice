class DynamicQueue {
  constructor(){
    this.quene = []
    this.isRunning = false
  }

  Task(fn,delay){
    this.quene.push({fn,delay})
    if(!this.isRunning){
      this.run()
    }
    return this
  }

  async run(){
    this.isRunning = true
    while(this.quene.length){
      const task = this.quene.shift()
      await new Promise(res => setTimeout(res,task.delay))
      await task.fn()
    }
    this.isRunning = false
  }
}