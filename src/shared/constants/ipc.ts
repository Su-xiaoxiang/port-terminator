/**
 * Electron IPC Channel 定义
 * 主进程和渲染进程之间进行数据交换和消息传递
 * 主进程使用 ipcMain 模块来监听来自渲染进程的消息，或向渲染进程发送消息。
 * 渲染进程使用 ipcRenderer 模块来向主进程发送消息，或监听主进程的推送。
 */

export const IPC_CHANNELS = {
  /**
   * 查询端口。
   */
  PORT_QUERY: 'port:query',

  /**
   * 强制结束进程。
   */
  PORT_KILL_PROCESS: 'port:kill-process'
} as const
