import { PortService } from '../modules/port/port.service'
import { registerPortIpc } from '../modules/port/port.ipc'

/**
 * 注册应用所有 IPC。
 */
export function registerIpcHandlers(portService: PortService): void {
  /**
   * 注册 Port 模块 IPC。
   */
  registerPortIpc(portService)
}
