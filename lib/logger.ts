export default class {
  public async info(...msgs: string[]) {
    await this.sendMsg('I', ...msgs);    
  }

  public async error(...msgs: string[]): Promise<void> {
    await this.sendMsg('E', ...msgs);
  }

  public async warning(...msgs: string[]): Promise<void> {
    await this.sendMsg('W', ...msgs);
  }

  private async sendMsg(type: string, ...msgs: string[]): Promise<void> {
    await console.log(`[${type}] ${new Date}`, ...msgs);
  }
}