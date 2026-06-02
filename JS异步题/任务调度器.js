class Scheduler {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }

  add(taskFn, retry = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, retry, resolve, reject });
      this.run();
    });
  }

  run() {
    if (this.running >= this.concurrency || !this.queue.length) return;

    const { taskFn, retry, resolve, reject } = this.queue.shift();
    this.running++;

    const attempt = (left) =>
      taskFn().catch((err) => {
        if (left > 0) return attempt(left - 1);
        throw err;
      });

    attempt(retry)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.running--;
        this.run();
      });
  }
}