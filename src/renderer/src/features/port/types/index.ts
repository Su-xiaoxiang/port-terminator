/**
 * 端口搜索表单状态。
 */
export interface PortSearchState {
  /**
   * 输入框内容。
   */
  port: string

  /**
   * 是否查询中。
   */
  loading: boolean

  /**
   * 错误。
   */
  error: string
}
