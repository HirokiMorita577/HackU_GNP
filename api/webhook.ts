// LINE Messaging API用のSDKをインポート
import * as line from '@line/bot-sdk';
import { commandHelp } from '../const/commandHelp';
import { createGroup } from '../firebase/create/createGroup';
import type { NextApiRequest, NextApiResponse } from 'next';

// LINE Botの認証情報を環境変数から取得
const channelAccessToken = process.env.LINE_ACCESS_TOKEN;
const channelSecret = process.env.LINE_CHANNEL_SECRET;

if (!channelAccessToken || !channelSecret) {
  throw new Error('LINE_ACCESS_TOKEN and LINE_CHANNEL_SECRET must be set');
}

const config = {
  channelAccessToken,
  channelSecret,
};

// LINEクライアントを初期化
const client = new line.Client(config);

// Next.js API Routeのエントリポイント
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST以外のリクエストは拒否
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // LINEの署名検証などを行うミドルウェアを適用
  const middleware = line.middleware(config);
  middleware(req, res, async () => {
    // 受信したイベント配列を取得
    const events = req.body.events;
    // 各イベントを非同期で処理
    const results = await Promise.all(events.map(handleEvent));
    // 処理結果をレスポンスとして返す
    res.status(200).json(results);
  });
}

// 各LINEイベントを処理する関数
async function handleEvent(event: any) {
  // テキストメッセージ以外は何もしない
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }
  const message = event.message.text.toLowerCase().replace(/[-_]/g, '').split(' ');
  // 「start」と送られた場合はLIFFアプリのURLを返信
  
  // 「start」以外のテキストにはコマンドヘルプを返信
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: commandSend(event, message) || commandHelp,
  });
}

function commandSend(event: any, message: string[]): string {
  const groupId = event.source?.type === 'group' ? event.source.groupId : null;
  switch (message[0]) {
    case 'start':
      message.slice(1).forEach(param => {
        const paramSet = param.split(':');
        if (paramSet.length === 2) {
          //const list = ['starttime', 'limitTime', 'limitPerson'];
          //未実装
        }
      });
      if (!groupId) {
        return 'このコマンドはグループ内で実行してください。';
      }
      createGroup(groupId, { startTime: 30, limitTime: 60, limitPerson: null });
      return `https://liff.line.me/2007570642-6BxVDbdl?groupId=${groupId}`;
    case 'setting':
      return 'https://liff.line.me/2007570642-6BxVDbdl';
    case 'score':
      return 'https://liff.line.me/2007570642-6BxVDbdl';
    case 'terms':
      return 'https://liff.line.me/2007570642-6BxVDbdl';
    case 'circle':
      return 'https://liff.line.me/2007570642-6BxVDbdl';
    default:
      return "";
  }
}
