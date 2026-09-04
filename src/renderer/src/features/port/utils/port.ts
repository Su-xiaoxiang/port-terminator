import { PORT_MAX, PORT_MIN } from '@shared/constants/app'

/**
 * 判断字符串是不是合法端口。
 */
export function isValidPort(value: string): boolean {
  //空的不合法
  if (!value) {
    return false
  }

  /**
   * 只允许数字。
   */
  if (!/^\d+$/.test(value)) {
    return false
  }

  const port = Number(value)

  return Number.isInteger(port) && port >= PORT_MIN && port <= PORT_MAX
}
