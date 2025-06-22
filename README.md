# 数独求解器 (Sudoku Solver)

这是一个基于 Next.js 开发的智能数独求解器，支持手动输入、图片识别和自动求解功能。

## 核心功能

- **手动输入数独**：提供直观的 9x9 网格界面，用户可手动输入数字
- **图片识别**：支持上传数独图片进行识别（目前使用模拟数据）  
- **自动求解**：使用回溯算法快速解决数独难题
- **国际化支持**：支持中英文语言切换
- **响应式设计**：适配不同设备屏幕尺寸

## 技术栈

- **前端框架**：Next.js 15、React 19
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **后端**：Next.js API Routes
- **部署**：Docker 容器化支持

## 项目结构

```
src/
├── app/
│   ├── [lang]/          # 国际化路由
│   ├── api/
│   │   ├── solve/       # 数独求解算法API
│   │   └── parse-image/ # 图片解析API
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 布局组件
│   └── page.tsx         # 主页面
├── components/
│   └── LanguageSwitcher.tsx  # 语言切换组件
├── i18n/
│   └── locales/         # 多语言配置
└── middleware.ts        # 中间件配置
```

## 算法实现

求解算法采用经典的**回溯法**（Backtracking）：
1. 遍历 9x9 网格寻找空白位置
2. 尝试填入 1-9 的数字
3. 验证行、列、3x3 宫格的唯一性
4. 递归求解，失败时回溯

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm start
```

### Docker 部署

```bash
# 构建镜像
docker build -t sudoku-solver .

# 运行容器
docker run -p 3000:3000 sudoku-solver
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用说明

1. **手动输入**：直接在网格中输入数字（1-9）
2. **图片上传**：点击"上传数独图片"按钮选择图片文件
3. **求解**：点击"解决数独"按钮自动求解
4. **语言切换**：通过语言切换器选择界面语言

## 开发计划

- [ ] 集成真实的 OCR 图像识别服务
- [ ] 添加数独生成功能
- [ ] 支持多种难度级别
- [ ] 添加求解步骤展示
- [ ] 优化移动端体验

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT License
