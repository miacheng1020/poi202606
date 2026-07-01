# PROJECT.md｜POI 組合器專案交接紀錄

## 最高規則

1. 以最新 `PROJECT.md` 為最高規範。
2. 除非使用者明確要求，否則不要重新設計、不要重構 Builder。
3. 只修正使用者指定的問題，不要順手修改其他功能。
4. Builder 與 index 必須保持同步；若使用者決定自行複製 Builder 改名為 index，則不需另外產生 index。
5. Builder Preview 固定使用 PC 初始版等比縮小，不觸發 RWD；展示頁與輸出頁才進行 RWD。
6. Demo 與 Wireframe 必須完全分離；Builder 使用 Wireframe，不使用 Demo。
7. 修改完成後，只提供有更新的檔案即可；1～3 個檔案不要打包 ZIP。
8. 交付 HTML 不得保留 Kaspersky 或其他防毒軟體／瀏覽器外掛自動注入的 `<script>`。
9. 更新 Builder 內的模組資料時，必須確保 `<script>`、`</script>`、反引號、跳脫字元不會中斷 Builder 主程式，避免左側按鈕 `addSection()` 失效。
10. 更新某個家族模組進 Builder 時，只替換該家族對應的 `MODULE_DATA` 內容；不得改動 Builder 主程式、左側選單事件、Output 產生器，除非使用者明確要求。

---

## 容器架構共識

所有模組以以下層級理解：

1. **滿版背景**：100% 寬，控制整體背景。
2. **區域背景**：1400px，作為區域背景圖塊或灰底範圍。
3. **中容器**：1162px，主要文字、卡牌、按鈕、影片等內容必須位於此版心內。
4. **小容器**：整組內容排列，例如一排四卡、圖文並排、影片播放器。
5. **小卡牌**：小容器內的單一內容元件。

---

## Builder Preview / Output Wrapper 最終規範

### Builder 的責任

Builder 負責「模組怎麼排列」，不負責重新定義卡牌本體。

Builder 統一管理：

- 小模組與小模組之間的 **margin**
- 小模組被 Builder 包起來後的 **wrapper padding**
- Output 頁整體 vertical rhythm

Builder 不修改：

- 卡牌本體 padding
- 卡牌內容版型
- 圖片比例
- 特殊視覺設計

### Builder Preview Wrapper

```css
/* PC */
.preview-module {
  margin-bottom: 20px;
}

.module-content .wireframe-wrap {
  padding-top: 16px;
  padding-bottom: 16px;
}

/* M */
@media (max-width: 767px) {
  .preview-module {
    margin-bottom: 16px;
  }
  .module-content .wireframe-wrap {
    padding-top: 12px;
    padding-bottom: 12px;
  }
}
```

最後一個 module 不留底部 margin。

### Output 頁 Vertical Rhythm

Output 是正式輸出頁，不必完全等同 Builder Preview。

目前 Output rhythm 採集中管理，不要分散在各模組補 margin / padding。

```text
Menu / Sub Menu
    ↓ 80px
第一個模組 Title
    ↓ 40px
第一個模組內容
    ↓ 40px
下一個模組 Title
    ↓ 40px
下一個模組內容
    ↓ 80px
Footer / 頁面底端
```

建議集中為變數：

```css
:root {
  --output-page-top-space: 80px;
  --output-module-gap: 40px;
  --output-title-gap: 40px;
  --output-page-bottom-space: 80px;
}
```

Output 裡若有 VIDEO、BLOG、CPN 等展示頁外層 section，自身 padding / margin 不得再疊加到 Output 節奏。若有異常，應在 Output 組裝層歸零外層 section padding / margin，不改卡牌本體。

---

## Widget Preview 規範

網頁小元件不是內容模組，而是控制元件。

Builder Preview 中的 Widget 應使用 compact preview：

- 不套用一般卡牌模組高度。
- 高度由元件內容決定。
- 僅保留小量上下 padding。
- 元件水平、垂直置中。
- 只影響 Builder Preview，不影響正式 Output。
- 不影響 PRD / FREE / INT / VIDEO / BLOG / QA / CPN / FBK 等內容模組。

---

## 字級表歸屬

### 產品字級表

- PRD 產品卡牌
- FREE 自由行卡牌

### 介紹卡牌字級表

- INT 介紹卡牌
- VIDEO 影片卡牌
- BLOG 部落格卡牌

### 依模組個別設計

- QA 卡牌
- TICKET / CPN 票券卡牌
- FBK 評價卡牌

---

## RWD 欄數一致性規範

適用所有卡牌系列，CPN / TICKET 票券卡牌必須嚴格遵守。

### 核心原則：同欄數＝同規格

在同一個 viewport 下，只要不同版型呈現相同欄數，就必須使用相同的卡牌視覺規格。

同欄數狀態下必須一致：

- 卡牌尺寸與比例
- 字級與行高
- padding / gap
- border radius
- 圓圈 / 裝飾 / 按鈕 / 價格 / link 等內部元件比例
- CPN 票券的圓圈尺寸、位置與側邊裝飾比例

不得因為原本是「一排四個」「一排三個」「一排二個」而保留不同字級或不同卡片大小。

### 欄數切換依 viewport，不依原始版型

錯誤示例：

```text
一排三個已經變兩欄
一排二個卻提早變單欄
```

正確示例：

```text
目前 viewport 支援兩欄
→ 一排四個：2 + 2
→ 一排三個：2 + 1
→ 一排二個：2
```

直到進入 mobile 單欄 breakpoint，全部才改為單欄。

---

## CPN / TICKET 票券系列規範

### CPN 系列目前狀態

- CPN_01：完成。
- CPN_02：完成。
- CPN_03：完成。
- CPN_01 / CPN_02 / CPN_03 已更新進 Builder。
- Builder 最新修正版已修正左側按鈕失效與 Output RWD 失效問題。

### CPN 共用規則

CPN 票券系列採 Component First。

原則：

- 同一系列只維護同一套 Ticket Component 思想。
- 不同 CPN 頁可有不同內容排列或裝飾，但不得重新建立完全不同的 RWD 邏輯。
- Demo / Wireframe 使用同一結構類推；Demo 可保留色彩與漸層，Wireframe 使用灰階架構。
- Builder 只抽 Wireframe，不抽 Demo。
- COUPON 等側邊文字優先使用 CSS 文字旋轉，不使用 SVG。

### CPN RWD 欄數規則

#### PC 初始狀態

```text
一排四個 → 4 欄 / small ticket
一排三個 → 3 欄 / medium ticket
一排二個 → 2 欄 / large ticket
```

#### Tablet / 兩欄狀態

```text
一排四個 → 2 + 2
一排三個 → 2 + 1
一排二個 → 2
```

此狀態下，三者每一張票券都必須使用完全相同的兩欄卡牌規格。

#### Mobile / 單欄狀態

```text
一排四個 → 1 + 1 + 1 + 1
一排三個 → 1 + 1 + 1
一排二個 → 1 + 1
```

只有進入 mobile 單欄 breakpoint 時，所有票券版型才一起改為單欄。  
一排二個不得在其他版型仍為兩欄時提早變成單欄。

---

## CPN_01 / CPN_02 圓圈規範

CPN_01 / CPN_02 使用左右凹洞式票券。

圓圈規則：

- 圓圈用與當前外層背景相同的顏色製造凹洞錯覺。
- 圓圈位於票券最上層。
- 左右圓圈各吃進卡片 50%。
- 圓圈永遠跟整張票券垂直置中。
- 圓圈必須保持正圓，且跟卡牌尺寸等比縮放。
- 不得使用固定 `top` 值定位圓圈。
- 卡片高度可由內容撐開。

---

## CPN_03 側邊票券規範

CPN_03 是「左側白色內容區 + 右側 COUPON 側邊裝飾條」的票券。

### 層級

```text
整張票券
├─ 左側白色內容區
│   ├─ title
│   ├─ divider
│   ├─ detail
│   └─ price / link
├─ 右側 COUPON 側邊裝飾條
│   └─ COUPON 文字（CSS 旋轉）
├─ 上圓
└─ 下圓
```

### 白色內容區與側邊裝飾條

- 白色內容區與右側側邊裝飾條是同一層級。
- 兩者使用 flex 並排。
- 兩者高度必須一致。
- 白色內容因文字撐高時，右側裝飾條必須跟著撐高。

### CPN_03 圓圈定位

CPN_03 圓圈不是左右置中圓，而是上下兩顆圓。

圓圈圓心固定在：

```text
白色內容區 / 右側裝飾條 / 卡片上下邊界 的交點
```

上圓：

- 圓心在白色內容區與右側裝飾條交界線上。
- 圓心同時位於卡片上邊界。
- 上半部位於外層背景。
- 左下覆蓋白色內容區。
- 右下覆蓋右側裝飾條。

下圓：

- 圓心在白色內容區與右側裝飾條交界線上。
- 圓心同時位於卡片下邊界。
- 下半部位於外層背景。
- 左上覆蓋白色內容區。
- 右上覆蓋右側裝飾條。

圓圈規則：

- 圓圈顏色永遠等於外層背景色，用來製造凹洞視覺。
- 圓圈位於最上層。
- 圓圈尺寸必須隨卡片等比縮放。
- 不得用 SVG 製造 COUPON 或圓圈效果。

---

## Builder 更新 CPN 的注意事項

更新 CPN_01 / CPN_02 / CPN_03 進 Builder 時，必須遵守：

1. 只更新 `MODULE_DATA` 中 CPN 對應 key。
2. 保留 Builder 原本主程式，不重構。
3. 不改左側選單 onclick / addSection / toggleL1 / toggleL2。
4. 模組 HTML 內若含 `<script>`，必須轉義，避免中斷 Builder 主 script。
5. 若 Output RWD 失效，優先檢查 Output 產生器是否把 CPN 的 media query / CSS 帶入完整。
6. Builder Preview 固定 PC 等比縮小，不觸發 CPN RWD。
7. Output 頁必須正常觸發 CPN RWD。
8. Output 中的 CPN 不得被全域 Output CSS 覆蓋掉欄數、寬度、圓圈或 side panel 規則。

---

## 已完成狀態

### 產品卡牌

- PRD_01～PRD_04：已完成並進 Builder。

### 自由行卡牌

- FREE_01～FREE_02：已完成並進 Builder。

### 介紹卡牌

- INT_01～INT_08：已完成並進 Builder。
- INT_08：Builder Preview / Output 已修正，不需要動態特效，只保留框架。

### 評價卡牌

- FBK_01：完成並進 Builder。

### 影片卡牌

- VIDEO_01：完成並進 Builder。
- VIDEO_02：完成並進 Builder。
  - 架構版 play icon 改為純 CSS。
  - Tag 改為 hug content。
  - 字級同步介紹卡牌字級表。
  - 已避免外部 `YTicon.svg` 依賴。
- VIDEO_03：完成並進 Builder。
- VIDEO_04：未來新增，暫緩。

### 部落格卡牌

- BLOG_01：完成並進 Builder。
  - 一排三個／一排二個／一排一個已更新。
  - 使用介紹卡牌字級表。
  - Output 中一排一個 RWD 已修正。
- BLOG_02：完成並進 Builder。
  - L 型裝飾屬於卡片本體，放在 1162 內。
  - 圖片主體與文字卡主體共用軸線。
  - L 型裝飾往外突出，不參與置中計算。
  - 上圖下文時，圖片與文字容器合併無縫隙。
  - 1024 時已避免 L 型溢出容器。

### QA 卡牌

- QA_01：完成並進 Builder。
- QA_02：完成並進 Builder。

### 票券卡牌

- CPN_01：完成並進 Builder。
- CPN_02：完成並進 Builder。
- CPN_03：完成並進 Builder。
- 票券系列已建立同欄數＝同規格規範。
- Builder 最新版本已修正 CPN 更新後左側按鈕失效問題。
- Builder 最新版本已修正 CPN Output 頁 RWD 失效問題。

---

## 目前最新交付檔

- `BUILDER_24_CPN_series_updated_output_rwd_fixed.html`
- `CPN_01(2).html`
- `CPN_02(2).html`
- `CPN_03(2).html`
- `PROJECT_v1.7_CPN_Builder_updated.md`

---

## 下一個新對話建議開場

請在新對話貼上：

> 接續 POI 組合器專案。  
> 請先閱讀最新 PROJECT.md，再開始作業。  
> 以目前最新 Builder 為基底，不重構 Builder，只修指定問題。  
> Builder Preview 固定 PC 等比縮小，不觸發 RWD；展示頁與 Output 頁才做 RWD。  
> Demo 與 Wireframe 分離，Builder 使用 Wireframe。  
> CPN 系列已完成並進 Builder；同欄數＝同規格；Output 頁 CPN RWD 已修正。  
> 更新 Builder 內模組資料時，務必避免 `<script>` 斷裂造成左側按鈕失效。
