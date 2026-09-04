import React from 'react'
import { Search } from 'lucide-react'

/**
 * PortSearch Props
 */
interface PortSearchProps {
  /**
   * 当前输入值。
   */
  port: string

  /**
   * 是否正在查询。
   */
  loading: boolean

  /**
   * 输入变化。
   */
  onChange: (value: string) => void

  /**
   * 点击查询。
   */
  onSearch: () => void
}

/**
 * 端口搜索组件
 */
export const PortSearch: React.FC<PortSearchProps> = (props) => {
  //解析参数
  const { port, loading, onChange, onSearch } = props

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {/* 标题区域 */}
      <div className="mb-5">
        <h2
          className="
            text-lg
            font-semibold
            text-slate-900
          "
        >
          端口占用查询
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          输入端口号，快速定位占用该端口的进程。
        </p>
      </div>

      {/* 搜索区域 */}
      <div className="flex gap-3">
        {/* 输入框 */}
        <div
          className="
            relative
            flex-1
          "
        >
          {/* 搜索图标 */}
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            value={port}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSearch()
              }
            }}
            placeholder="请输入端口，例如 8080"
            inputMode="numeric"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-11
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-slate-400
              focus:bg-white
              focus:ring-4
              focus:ring-slate-100
            "
          />
        </div>

        {/* 查询按钮 */}
        <button
          type="button"
          onClick={onSearch}
          disabled={loading}
          className="
            h-12
            rounded-xl
            bg-slate-900
            px-6
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? '查询中...' : '查询'}
        </button>
      </div>
    </section>
  )
}
