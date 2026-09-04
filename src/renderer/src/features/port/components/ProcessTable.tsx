import { Ban, Cpu } from 'lucide-react'
import React from 'react'
import type { PortProcess } from '@shared/types'

interface ProcessTableProps {
  /**
   * 当前端口对应的进程
   */
  processes: PortProcess[]

  /**
   * 正在关闭哪个 PID
   */
  killingPid: number | null

  /**
   * 点击关闭
   */
  onKill: (process: PortProcess) => void
}

/**
 * 进程列表
 */
export const ProcessTable: React.FC<ProcessTableProps> = (props) => {
  //解析参数
  const { processes, killingPid, onKill } = props

  /**
   * 没有结果
   */
  if (processes.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          py-20
          text-center
        "
      >
        <Cpu
          size={32}
          className="
            mx-auto
            mb-4
            text-slate-300
          "
        />

        <p
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          当前端口没有发现占用进程
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          可以尝试查询其他端口
        </p>
      </div>
    )
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* 表头 */}
      <div
        className="
          border-b
          border-slate-100
          px-6
          py-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-900
          "
        >
          <Cpu size={17} />
          占用进程
        </div>

        <p
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          共发现 {processes.length} 条记录
        </p>
      </div>

      {/* 横向滚动容器 */}
      <div className="overflow-x-auto">
        <table
          className="
            w-full
            text-left
          "
        >
          <thead>
            <tr
              className="
                border-b
                border-slate-100
                bg-slate-50
                text-xs
                text-slate-500
              "
            >
              <th className="px-6 py-4">进程</th>

              <th className="px-6 py-4">PID</th>

              <th className="px-6 py-4">协议</th>

              <th className="px-6 py-4">本地地址</th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                "
              >
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {processes.map((process) => (
              <tr
                key={[process.pid, process.protocol, process.localAddress].join('-')}
                className="
                    border-b
                    border-slate-100
                    last:border-none
                    hover:bg-slate-50
                  "
              >
                {/* 进程名称 */}
                <td
                  className="
                      px-6
                      py-5
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                >
                  {process.processName}
                </td>

                {/* PID */}
                <td
                  className="
                      px-6
                      py-5
                      font-mono
                      text-sm
                      text-slate-600
                    "
                >
                  {process.pid}
                </td>

                {/* 协议 */}
                <td className="px-6 py-5">
                  <span
                    className="
                        rounded-lg
                        bg-slate-100
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-slate-600
                      "
                  >
                    {process.protocol}
                  </span>
                </td>

                {/* 地址 */}
                <td
                  className="
                      px-6
                      py-5
                      font-mono
                      text-xs
                      text-slate-500
                    "
                >
                  {process.localAddress}
                </td>

                {/* 操作 */}
                <td
                  className="
                      px-6
                      py-5
                      text-right
                    "
                >
                  <button
                    type="button"
                    disabled={killingPid === process.pid}
                    onClick={() => onKill(process)}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-red-200
                        bg-red-50
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-red-600
                        transition
                        hover:bg-red-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                  >
                    <Ban size={14} />

                    {killingPid === process.pid ? '关闭中...' : '强制关闭'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
