import React, { useState } from 'react'
import { Activity } from 'lucide-react'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { PortSearch } from '@renderer/features/port/components/PortSearch'
import { PortResult } from '@renderer/features/port/components/PortResult'
import { usePort } from '@renderer/features/port/hooks/usePort'
import { isValidPort } from '@renderer/features/port/utils/port'

/**
 * 首页
 */
export const HomePage: React.FC = () => {
  /**
   * 输入框。
   *
   * 默认 8080
   */
  const [port, setPort] = useState('8080')

  /**
   * 正在关闭的 PID
   */
  const [killingPid, setKillingPid] = useState<number | null>(null)

  /**
   * 操作提示
   */
  const [message, setMessage] = useState('')

  /**
   * Port Hook
   */
  const { result, loading, error, query, killProcess } = usePort()

  /**
   * 点击查询
   */
  const handleSearch = (): void => {
    //进行校验
    if (!isValidPort(port)) {
      setMessage('请输入 1 - 65535 之间的有效端口')
    }

    //清除旧消息
    setMessage('')

    void query(Number(port))
  }

  /**
   * 强制关闭进程
   */
  const handleKill = async (pid: number): Promise<void> => {
    //消息提示
    const confirmed = window.confirm(`确认强制关闭 PID ${pid} 对应的进程吗？`)

    if (!confirmed) {
      return
    }

    try {
      //加载按钮
      setKillingPid(pid)

      const response = await killProcess(pid)

      setMessage(response.message)

      //关闭成功之后自动执行一次查询
      if (response.success) {
        await query(Number(port))
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '关闭进程失败')
    } finally {
      setKillingPid(null)
    }
  }

  return (
    <MainLayout>
      {/* 页面标题 */}
      <div
        className="
          mb-8
        "
      >
        <div
          className="
            mb-2
            flex
            items-center
            gap-2
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          <Activity size={24} />
          端口占用管理
        </div>

        <p
          className="
            text-sm
            text-slate-500
          "
        >
          快速定位占用端口的进程， 并在必要时执行强制终止
        </p>
      </div>

      {/* 搜索框 */}
      <PortSearch port={port} loading={loading} onChange={setPort} onSearch={handleSearch} />

      {/* 错误 / 成功消息 */}
      {(error || message) && (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-sm
            text-slate-600
          "
        >
          {error || message}
        </div>
      )}

      {/* 查询结果 */}
      <PortResult result={result} killingPid={killingPid} onKill={handleKill} />
    </MainLayout>
  )
}
