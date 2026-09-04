import { KillProcessResult, PortQueryResult } from '@shared/types'

/**
 * Renderer Port Service。
 *
 * 做一层业务能力封装。
 */
export const portService = {
  /**
   * 查询端口。
   */
  queryPort(port: number): Promise<PortQueryResult> {
    return window.electronAPI.portApi.queryPort(port)
  },

  /**
   * 强制关闭进程。
   */
  killProcess(pid: number): Promise<KillProcessResult> {
    return window.electronAPI.portApi.killProcess(pid)
  }
}
