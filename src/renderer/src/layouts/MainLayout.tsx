import type { ReactNode } from 'react'
import React from 'react'
import { ShieldCheck } from 'lucide-react'

interface MainLayoutProps {
  children: ReactNode
}

/**
 * 应用主布局。
 */
export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        bg-slate-50
      "
    >
      {/* 顶部 Header */}
      <header
        className="
          flex
          h-16
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-7
        "
      >
        {/* Logo */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-slate-900
              text-white
            "
          >
            <ShieldCheck size={19} />
          </div>

          <div>
            <div
              className="
                text-sm
                font-bold
                text-slate-900
              "
            >
              端口终结者
            </div>

            <div
              className="
                text-[11px]
                text-slate-400
              "
            >
              Port Terminator
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main
        className="
          flex-1
          overflow-auto
          px-8
          py-8
        "
      >
        <div
          className="
            mx-auto
            max-w-6xl
          "
        >
          {props.children}
        </div>
      </main>
    </div>
  )
}
