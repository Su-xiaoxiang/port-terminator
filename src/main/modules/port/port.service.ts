/**
 * Port业务服务
 * 负责参数校验 调用仓储层 组织返回数据
 */

import { PortQueryResult } from '@shared/types'
import { PortRepository } from './port.repository'
import { PORT_MAX, PORT_MIN } from '@shared/constants/app'

export class PortService {
  constructor(private readonly repository: PortRepository) {}

  /**
   * 查询端口。
   */
  async queryPort(port: number): Promise<PortQueryResult> {
    //参数校验
    if (!Number.isInteger(port)) {
      throw new Error('端口必须是整数')
    }

    if (port < PORT_MIN || port > PORT_MAX) {
      throw new Error(`端口范围必须是 ${PORT_MIN} - ${PORT_MAX}`)
    }

    //调用抽象 Repository
    const processes = await this.repository.findByPort(port)

    return {
      port,
      processes
    }
  }

  /**
   * 强制关闭进程。
   */
  async killProcess(pid: number): Promise<void> {
    //参数校验
    if (!Number.isInteger(pid) || pid <= 0) {
      throw new Error('无效的进程 PID')
    }

    //调用抽象 Repository
    await this.repository.killProcess(pid)
  }
}
