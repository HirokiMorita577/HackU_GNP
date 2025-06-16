// LINE Messaging API用のSDKをインポート
import * as line from '@line/bot-sdk';
import { createGroup  } from './firebase/create/createGroup.js';
import type { NextApiRequest, NextApiResponse } from 'next';
const commandHelp = `
【コマンド一覧】

start
  LIFFアプリのURLを送信

help
  このコマンドヘルプを表示

(他にも追加可能)
`;

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
    text: await commandSend(event, message) || commandHelp,
  });
}

async function commandSend(event: any, message: string[]): Promise<string> {
  const groupId = event.source?.type === 'group' ? event.source.groupId : null;
  const command = message[0];
  switch (command) {
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
      const persons = await client.getGroupMemberIds(groupId)
        .then(ids => ids)
        .catch((error) => {
          console.error(groupId,'グループメンバーの取得に失敗:', error);
          return [];
        });
      createGroup(groupId, {
        startTime: null,  
        limitTime: null,
        limitPerson: null,
        persons: persons,
      })
      return `https://liff.line.me/2007570642-6BxVDbdl/group/map?groupId=${groupId}`;
    case 'setting':
      return 'https://liff.line.me/2007570642-6BxVDbdl/setting';
    case 'score':
      return 'https://liff.line.me/2007570642-6BxVDbdl/score';
    case 'terms':
      return 'https://liff.line.me/2007570642-6BxVDbdl/terms';
    case 'circle':
      return 'https://liff.line.me/2007570642-6BxVDbdl/circle';
    default:
      return "";
  }
}


