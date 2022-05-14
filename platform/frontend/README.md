# Description
## Hierarchy

### Frontend

* 主要存前端的部份，包括網頁界面，與後端溝通的程式碼等等

```
├── App.tsx
├── assets
│   └── logo.svg
├── components
│   ├── Dashboard
│   │   ├── Header
│   │   │   ├── HeaderButtons.tsx
│   │   │   ├── HeaderUserMenu.tsx
│   │   │   └── index.tsx
│   │   ├── index.tsx
│   │   └── Sidebar
│   │       ├── index.tsx
│   │       ├── SidebarLogo.tsx
│   │       └── SidebarMenu.tsx
│   ├── MainComponent
│   │   ├── index.tsx
│   │   ├── Home
│   │   │   └── index.tsx
│   │   ├── Problems
│   │   │   └── index.tsx
│   │   └── Tutorial
│   │       └── index.tsx
│   └── Suspense
│       └── index.tsx
├── index.css
├── index.tsx
├── router
│   └── Routes.tsx
└── theme
    ├── MainTheme.ts
    └── ThemeProvider.tsx
```
* `public`: 存一些靜態的檔案，如 index.html, robots.txt 等等
* `src`: React 的所有程式碼都在這
    * `App.tsx`: 此 App 的主體
    * `Router`: 此 App 的路由
        * `/route.tsx`: 前端路由設定檔。此用 React Router
    * `components`: 此 App 的所有組件都在這
        * `Dashboard`: 左側與上側的儀表板
            * `Sidebar`: 左側的儀表板
                * `SidebarLogo`: 左上方的標誌
                * `SidebarMenu`: 目錄
            * `Header`: 上側的儀表板
                * `HeaderUserMenu`: 右上角的下拉選單
                * `HeaderButtons`: 上側儀表板的所有按鈕
        * `MainComponent`: 主要的組件
            * `Home`: 首頁
            * `Tutorial`: 教學
            * `Problems`: 所有的題目
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
3. 在 `router/route.tsx` 增加路徑

## API


