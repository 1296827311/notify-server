interface IReqToken {
  id: string
  secret: string
}

interface MsgData {
  msgtype: string
  [key: string]: any
}

interface PostMsgOption {
  agentid: string; // 应用 id
  touser?: string
  msgtype: 'text' | 'textcard' | 'news' | 'mpnews'
  [key: string]: any
}

type FnReqPostMsg<T = any> = (token: string, options: PostMsgOption) => Promise<T>
