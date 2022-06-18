# Description
## Hierarchy

### Frontend

* 主要存前端的部份，包括網頁界面，與後端溝通的程式碼等等

```
.
├── public
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── logo.svg
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login
│   │   │   │   └── index.tsx
│   │   │   └── Register
│   │   │       └── index.tsx
│   │   ├── Dashboard
│   │   │   ├── Header
│   │   │   │   ├── HeaderButtons.tsx
│   │   │   │   ├── HeaderUserMenu.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── index.tsx
│   │   │   └── Sidebar
│   │   │       ├── index.tsx
│   │   │       ├── SidebarLogo.tsx
│   │   │       └── SidebarMenu.tsx
│   │   ├── Error
│   │   │   └── _404.tsx
│   │   ├── Landing
│   │   │   └── index.tsx
│   │   ├── Main
│   │   │   ├── Challenges
│   │   │   │   └── index.tsx
│   │   │   ├── Home
│   │   │   │   └── index.tsx
│   │   │   ├── index.tsx
│   │   │   ├── Problems
│   │   │   │   └── index.tsx
│   │   │   ├── Template
│   │   │   │   └── index.tsx
│   │   │   └── Tutorial
│   │   │       └── index.tsx
│   │   └── Suspense
│   │       └── index.tsx
│   ├── context
│   ├── index.css
│   ├── index.tsx
│   ├── router
│   │   └── Router.tsx
│   └── theme
│       ├── MainTheme.ts
│       └── ThemeProvider.tsx
├── tsconfig.json
└── yarn.lock
```
* `public`: 存一些靜態的檔案，如 index.html, robots.txt 等等
* `src`: React 的所有程式碼都在這
    * `App.tsx`: 此 App 的主體
    * `assets`: 存一些靜態的檔案，如影像等
    * `router`: 此 App 的路由
        * `/Router.tsx`: 前端路由設定檔。此用 React Router
    * `components`: 此 App 的所有組件都在這
        * `Auth`: 處理登入或登出
        * `Dashboard`: 左側與上側的儀表板
            * `Sidebar`: 左側的儀表板
                * `SidebarLogo`: 左上方的標誌
                * `SidebarMenu`: 目錄
            * `Header`: 上側的儀表板
                * `HeaderUserMenu`: 右上角的下拉選單
                * `HeaderButtons`: 上側儀表板的所有按鈕
        * `Error`: 處理 404 頁面等
        * `Landing`: 首頁
        * `Main`: 主要的組件
            * `Home`: 首頁
            * `Tutorial`: 教學
            * `Problems`: 所有的題目
            * `Challenge`: 題目本身
        * Suspense: 把各組件包一個 CircularProgress
    * `index.tsx`: 此 App 的進入點
    * `index.css`: 此 App 的主要 CSS
    * `theme`:
        * `MainTheme`: 此 App 使用的樣式。
        * `ThemeProvider.tsx`: 把上面的樣式包成一個 provider
        * [source](https://github.com/bloomui/tokyo-free-white-react-admin-dashboard/blob/main/src/theme/ThemeProvider.tsx)

### How to add an own component?

假設你想要創造新的組件叫 Meow

1. 在 `components/MainComponent` 創建 `Meow/index.tsx` （可從 `Template/index.tsx` 複製模板）
2. 在 `components/Dashboard/Sidebar/SidebarMenu.tsx` 中增添一個 menu entry
3. 在 `router/Router.tsx` 增加路徑

## API


