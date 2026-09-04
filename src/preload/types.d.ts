import type { PortApi } from '@shared/types'

// 未来如果有其他模块，直接在这里加
export interface IElectronAPI {
  portApi: PortApi
}

// 默认ts不知道window.electron 在这里导出
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

// 必须保留，防止全局类型污染
export {}
