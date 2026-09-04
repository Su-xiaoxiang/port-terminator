import { BrowserWindow, Menu } from 'electron'

import { join } from 'node:path'

import { APP_CONFIG } from '../config/app.config'

/**
 * 创建window应用主窗口。
 */
export class WindowService {
  //全局变量
  private mainWindow: BrowserWindow | null = null

  /**
   * 创建主窗口。
   */
  createMainWindow(): BrowserWindow {
    this.mainWindow = new BrowserWindow({
      /**
       * 默认大小。
       */
      width: APP_CONFIG.windowWidth,

      height: APP_CONFIG.windowHeight,

      /**
       * 用户不能无限缩小。
       */
      minWidth: APP_CONFIG.minWidth,

      minHeight: APP_CONFIG.minHeight,

      /**
       * 设置窗口名称。
       */
      title: APP_CONFIG.name,

      /**
       * 页面Logo
       */
      icon: join(process.cwd(), 'build/icon.ico'),

      webPreferences: {
        /**
         * Preload 是唯一的桥梁。
         */
        preload: join(__dirname, '../preload/index.js'),

        /**
         * 禁止 Renderer 直接使用 Node.js。
         */
        nodeIntegration: false,

        /**
         * 开启 Context Isolation。
         */
        contextIsolation: true,

        /**
         * 使用沙箱。
         */
        sandbox: true
      }
    })

    //关闭菜单
    Menu.setApplicationMenu(null)

    /**
     * 开发环境加载 Vite。
     */
    const devUrl = process.env.ELECTRON_RENDERER_URL

    if (devUrl) {
      void this.mainWindow.loadURL(devUrl)
    } else {
      //生产环境加载打包后的 HTML。
      void this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    return this.mainWindow
  }

  /**
   * 获取主窗口。
   */
  getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }
}
