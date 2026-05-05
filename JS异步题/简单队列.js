class taskQuene {
  constructor() {
    this.quene = [];
  }
  task(delay, fn) {
    this.quene.push({ delay, fn });
    return this;
  }
  async start() {
    for (const i of this.quene) {
      await new Promise((res) => setTimeout(res, i.delay));
      await i.fn();
    }
  }
}
