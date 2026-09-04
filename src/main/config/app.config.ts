import { APP_NAME } from '@shared/constants/app'

/**
 * Electron窗口配置
 */
export const APP_CONFIG = {
  //应用名称
  name: APP_NAME,

  //默认窗口宽度
  windowWidth: 1100,

  //默认窗口高度
  windowHeight: 760,

  //最小宽度
  minWidth: 900,

  //最小高度
  minHeight: 650
} as const
