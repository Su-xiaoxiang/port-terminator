/**
 * 主进程和渲染进程共享类型
 */

//端口协议
export type PortProtocol = 'TCP' | 'UDP'

//端口信息表示数据模型
export interface PortProcess {
  //协议
  protocol: PortProtocol

  //本地地址
  localAddress: string

  //本地端口
  localPort: number

  //pid
  pid: number

  //进程名称
  processName: string
}

//查询端口后的结果。
export interface PortQueryResult {
  //查询的端口
  port: number

  //当前端口对应的所有进程。
  processes: PortProcess[]
}

//关闭进程的响应
export interface KillProcessResult {
  //是否成功
  success: boolean

  //消息
  message: string
}

//Preload 暴露给 Renderer 的完整 API。
export interface PortApi {
  //查询端口
  queryPort(port: number): Promise<PortQueryResult>

  //关闭进程
  killProcess(pid: number): Promise<KillProcessResult>
}
