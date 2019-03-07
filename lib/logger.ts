export async function info(...msgs: string[]): Promise<void> {
  await sendMsg('I', ...msgs);    
}

export async function error(...msgs: string[]): Promise<void> {
  await sendMsg('E', ...msgs);
}

export async function warning(...msgs: string[]): Promise<void> {
  await sendMsg('W', ...msgs);
}


async function sendMsg(type: string, ...msgs: string[]): Promise<void> {
  await console.log(`[${type}] ${new Date}`, ...msgs);
}
