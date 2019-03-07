import * as moment from 'moment'

let logging = true;

export function setLogging(value: boolean) {
  logging = value;
}

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
  if (!logging) return;
  await console.log(`[${type}] ${moment().format('MM-DD HH:mm:ss,SSS')}:`, ...msgs);
}
