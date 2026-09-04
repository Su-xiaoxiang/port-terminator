import { IPC_CHANNELS } from '@shared/constants/ipc'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { PortService } from 'src/main/modules/port/port.service'

/**
 * 进程间通信 主进程（Main Process）与渲染进程（Renderer Process）之间进行数据交互和通信的核心机制
 */

/**
 * 判断IPC请求是否来自渲染层
 * @param event
 * @returns
 */
function isTrustedSender(event: IpcMainInvokeEvent): boolean {
  //获取URL
  const url = event.senderFrame?.url

  if (!url) {
    return false
  }

  //开发环境
  const devUrl = process.env.ELECTRON_RENDERER_URL

  if (devUrl && url.startsWith(devUrl)) {
    return true
  }

  //生产环境
  return url.startsWith('file://')
}

/**
 * 注册 Port 相关 IPC
 * 用户渲染进程向通道发送消息在这里处理
 * @param service
 */
export function registerPortIpc(service: PortService): void {
  /**
   * 查询端口
   */
  ipcMain.handle(
    //在主进程里面注册通道
    IPC_CHANNELS.PORT_QUERY,

    async (event, port) => {
      //安全校验
      if (!isTrustedSender(event)) {
        throw new Error('非法 IPC 请求')
      }

      return service.queryPort(Number(port))
    }
  )

  /**
   * 强制关闭进程。
   */
  ipcMain.handle(
    //在主进程里面注册通道
    IPC_CHANNELS.PORT_KILL_PROCESS,

    async (event, pid) => {
      //安全校验
      if (!isTrustedSender(event)) {
        throw new Error('非法 IPC 请求')
      }

      //调用服务层方法
      await service.killProcess(Number(pid))

      return {
        success: true,
        message: `PID ${pid} 已成功终止`
      }
    }
  )
}
