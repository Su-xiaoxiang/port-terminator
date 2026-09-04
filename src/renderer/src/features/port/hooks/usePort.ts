import { useState } from 'react'

import type { KillProcessResult, PortQueryResult } from '@shared/types'

import { portService } from '../services/port.service'

/**
 * usePort 返回值。
 */
interface UsePortReturn {
  //查询结果
  result: PortQueryResult | null

  //查询中
  loading: boolean

  //错误信息
  error: string

  //查询端口
  query(port: number): Promise<void>

  //关闭进程
  killProcess(pid: number): Promise<KillProcessResult>
}

/**
 * Port 业务 Hook。
 */
export function usePort(): UsePortReturn {
  /**
   * 查询结果。
   */
  const [result, setResult] = useState<PortQueryResult | null>(null)

  /**
   * 查询中。
   */
  const [loading, setLoading] = useState(false)

  /**
   * 错误信息。
   */
  const [error, setError] = useState('')

  /**
   * 查询端口。
   */
  async function query(port: number): Promise<void> {
    try {
      //开始loading
      setLoading(true)

      //清除旧的错误防止冲突
      setError('')

      const data = await portService.queryPort(port)

      setResult(data)
    } catch (error) {
      //查询失败
      setResult(null)

      setError(error instanceof Error ? error.message : '端口查询失败')
    } finally {
      setLoading(false)
    }
  }

  /**
   * 杀掉指定 PID。
   */
  async function killProcess(pid: number): Promise<KillProcessResult> {
    return portService.killProcess(pid)
  }

  return {
    result,
    loading,
    error,
    query,
    killProcess
  }
}
