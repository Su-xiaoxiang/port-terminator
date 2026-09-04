# 端口终结者

![Electron](https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

**Port Terminator** —— 一个简洁、快速的 Windows 端口占用管理工具。

面向开发者和 Windows 用户，用于快速查询指定端口被哪个进程占用，并支持对占用进程进行强制终止。

---

## 功能特性

| 特性 | 说明 |
|------|------|
| 端口占用查询 | 输入端口号，读取 Windows 当前网络连接信息，展示占用进程 |
| 强制终止进程 | 根据 PID 终止对应进程，并自动重新查询端口状态 |
| IPv4 / IPv6 识别 | 识别 `0.0.0.0:8080` 和 `[::]:8080` 等同进程的多地址监听 |
| 安全架构 | Electron Main / Preload / Renderer 分离，Renderer 不直接访问系统能力 |
| 简洁 UI | React + Tailwind CSS 构建，开发者工具风格 |

---

## 技术栈

- Electron
- React
- TypeScript
- Vite / electron-vite
- Tailwind CSS
- lucide-react
- electron-builder

---

##  快速开始

### 环境要求

建议使用较新的 Node.js LTS 版本，并确保 Windows 环境可以正常执行：

- `netstat.exe`
- `tasklist.exe`
- `taskkill.exe`

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

### 类型检查

```bash
npm run typecheck
```

> 建议在提交代码前先执行类型检查。

### Windows 打包

```bash
npm run build:win
```

构建完成后，安装包通常位于：

```text
dist/
└── 端口终结者-Setup-x.x.x.exe
```

安装包采用 NSIS 安装向导，支持用户选择安装目录，并创建桌面和开始菜单快捷方式。

---

## 使用示例

假设本地 Spring Boot 项目启动失败，提示 `8080` 端口已被占用：

1. 打开端口终结者
2. 输入 `8080`
3. 点击「查询」
4. 查看进程名称和 PID
5. 确认该进程可以关闭后，点击「强制关闭」
6. 应用会重新查询 `8080`，确认端口是否已经释放

---

## 注意事项

- 「强制关闭」属于高权限操作，请确认目标进程可以安全终止后再执行。
- 部分系统进程、管理员权限运行的进程或受保护进程可能无法直接终止。遇到权限问题时，可以尝试以管理员身份运行应用。

---

## 平台支持

当前版本主要针对 **Windows x64**，端口查询和进程终止能力基于 Windows 系统命令实现。

后续可以扩展 macOS 和 Linux 平台支持。

---

## 问题反馈

在使用过程中遇到 Bug、功能异常、安装问题或有功能建议，欢迎联系：

 **邮箱**：suxiaoxiang0217@gmail.com

提交问题时建议附带：

- Windows 版本
- 端口号
- 错误提示
- 操作步骤
- 截图（如有）

这样可以更快定位问题。

---

##  License

本项目的开源协议以仓库实际 LICENSE 文件为准。

---