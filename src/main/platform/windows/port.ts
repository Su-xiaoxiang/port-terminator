import { PortProcess } from '@shared/types'
import { execFile } from 'child_process'
import { PortRepository } from 'src/main/modules/port/port.repository'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

/**
 * netstat原始数据
 */
interface NetstatRecord {
  //协议
  protocol: 'TCP' | 'UDP'

  //本地地址
  localAddress: string

  //本地端口
  localPort: number

  //状态
  state: string

  //标识
  pid: number
}

/**
 * 仓储实现
 */
export class WindowsPortRepository implements PortRepository {
  async findByPort(port: number): Promise<PortProcess[]> {
    //执行：netstat.exe -ano -a = 显示所有连接和监听端口 -n = 使用数字地址和端口  -o = 显示 PID
    const { stdout: processListStdout } = await execFileAsync('netstat.exe', ['-ano'], {
      windowsHide: true,
      encoding: 'utf8'
    })

    //解析记录
    const result: NetstatRecord[] = []
    const processListLines = String(processListStdout).split(/\r?\n/)
    for (const line of processListLines) {
      const columns = line.trim().split(/\s+/)

      // 数据不足或表头直接跳过
      if (columns.length < 4) {
        continue
      }

      const protocol = columns[0]
      if (protocol !== 'TCP' && protocol !== 'UDP') {
        continue
      }

      const localAddress = columns[1]

      // 提取端口号
      const index = localAddress.lastIndexOf(':')
      const localPort = Number(localAddress.slice(index + 1))

      // 核心过滤：只保留目标端口
      if (localPort !== port) {
        continue
      }

      let state = ''
      let pidText = ''

      if (protocol === 'TCP') {
        state = columns[3]
        pidText = columns[4]
      } else {
        // UDP 没有 State 列
        state = 'ACTIVE'
        pidText = columns[3]
      }

      const pid = Number(pidText)
      if (!Number.isInteger(pid) || pid <= 0) {
        continue
      }

      result.push({
        protocol,
        localAddress,
        localPort,
        state,
        pid
      })
    }

    //没用占用
    if (result.length === 0) {
      return []
    }

    //收集所有PID 用set去重
    const pids = new Set(result.map((record) => record.pid))

    //根据PID获取进程名称
    const { stdout: processName } = await execFileAsync('tasklist.exe', ['/FO', 'CSV', '/NH'], {
      windowsHide: true,
      encoding: 'utf8'
    })

    const processNames = new Map<number, string>()
    const processLines = String(processName).split(/\r?\n/)

    for (const line of processLines) {
      const match = line.match(/^"([^"]+)","(\d+)"/)

      if (!match) {
        continue
      }

      const processName = match[1]

      const pid = Number(match[2])

      if (pids.has(pid)) {
        processNames.set(pid, processName)
      }
    }

    const processes = result.map((record) => ({
      ...record,
      processName: processNames.get(record.pid) ?? '未知进程'
    }))

    //进行IPV4 IPV6的去重
    return Array.from(new Map(processes.map((process) => [process.pid, process])).values())
  }

  async killProcess(pid: number): Promise<void> {
    //对应 Windows 命令：taskkill /PID 12345 /T /F /PID 指定 PID  /T   同时结束子进程 /F   强制结束

    await execFileAsync('taskkill.exe', ['/PID', String(pid), '/T', '/F'], {
      windowsHide: true,
      encoding: 'utf8'
    })
  }
}
