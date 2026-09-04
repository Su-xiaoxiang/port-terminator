import { ipcRenderer } from 'electron'

import { IPC_CHANNELS } from '@shared/constants/ipc'

import type { PortApi } from '@shared/types'

/**
 * Port API。
 *
 * 这里是 Electron Main 和 React Renderer
 * 之间的“安全桥梁”。
 */
export const portApi: PortApi = {
  /**
   * 查询端口。
   */
  queryPort(port) {
    return ipcRenderer.invoke(IPC_CHANNELS.PORT_QUERY, port)
  },

  /**
   * 强制结束进程。
   */
  killProcess(pid) {
    return ipcRenderer.invoke(IPC_CHANNELS.PORT_KILL_PROCESS, pid)
  }
}
