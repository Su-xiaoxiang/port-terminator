/**
 * 端口操作能力的抽象
 * 只表明接口例如java里面的仓储层
 */

import { PortProcess } from '@shared/types/index'

export interface PortRepository {
  /**
   * 查询指定端口对应的进程。
   */
  findByPort(port: number): Promise<PortProcess[]>

  /**
   * 强制关闭指定 PID。
   */
  killProcess(pid: number): Promise<void>
}
