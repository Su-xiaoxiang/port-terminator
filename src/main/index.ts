import { app } from 'electron'
import { PortService } from './modules/port/port.service'
import { WindowsPortRepository } from './platform/windows/port'
import { WindowService } from './services/window.service'
import { registerIpcHandlers } from './ipc'

/**
 * Window Service。
 */
const windowService = new WindowService()

/**
 * 初始化应用。
 *
 * Repository -> service -> IPC
 */
function bootstrap(): void {
  //组装 Port 模块
  const repository = new WindowsPortRepository()
  const portService = new PortService(repository)
  registerIpcHandlers(portService)

  /**
   * 创建窗口。
   */
  windowService.createMainWindow()
}

/**
 * Electron 初始化
 */
app.whenReady().then(bootstrap)

/**
 * Windows
 *
 * 所有窗口关闭以后退出应用。
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
