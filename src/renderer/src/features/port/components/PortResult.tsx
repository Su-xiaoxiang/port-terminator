import type { PortQueryResult } from '@shared/types'
import React from 'react'
import { ProcessTable } from './ProcessTable'

interface PortResultProps {
  /**
   * 查询结果。
   */
  result: PortQueryResult | null

  /**
   * 正在关闭哪个 PID。
   */
  killingPid: number | null

  /**
   * 关闭进程。
   */
  onKill: (pid: number) => void
}

/**
 * Port 查询结果区域。
 */
export const PortResult: React.FC<PortResultProps> = (props) => {
  //解析参数
  const { result, killingPid, onKill } = props

  /**
   * 还没有查询时不显示。
   */
  if (!result) {
    return null
  }

  return (
    <section className="mt-6">
      {/* 查询信息 */}
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <div>
          <span
            className="
              font-mono
              text-lg
              font-bold
              text-slate-900
            "
          >
            :{result.port}
          </span>
        </div>
      </div>

      {/* 进程表格 */}
      <ProcessTable
        processes={result.processes}
        killingPid={killingPid}
        onKill={(process) => onKill(process.pid)}
      />
    </section>
  )
}
