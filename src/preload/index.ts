/**
 * 向渲染进程暴漏安全的API
 */

import { contextBridge } from 'electron'
import { portApi } from './api/port.api'

// 聚合所有 API
const electronAPI = {
  portApi: portApi
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
