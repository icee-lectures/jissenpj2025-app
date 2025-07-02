# A-Frame VR 移動テスト - リファクタリング後

## Webページ

https://icee-lectures.github.io/jissenpj2025-app/

## ファイル構成

```
├── index.html          # メインHTMLファイル
├── css/
│   └── styles.css      # スタイルシート
├── js/
│   ├── components.js   # A-Frameカスタムコンポーネント
│   └── game.js         # ゲームロジック
├── ark.blend.glb       # 3Dモデル
├── deskModel.glb       # 3Dモデル
└── README.md           # このファイル
```

## リファクタリングの内容

### 1. ファイル分割
- **index.html**: HTMLマークアップのみに集中
- **js/components.js**: A-Frameのカスタムコンポーネントを分離
- **js/game.js**: ゲームロジックとイベント処理を分離
- **css/styles.css**: スタイル定義を分離

### 2. 改善点

#### コード構造の改善
- グローバル変数の適切な管理
- 設定値の定数化（GAME_CONFIG）
- 関数の責任分離
- コメントの整理

#### メンテナンス性の向上
- 各ファイルの役割を明確化
- 設定の一元管理
- エラーハンドリングの準備

#### 可読性の向上
- 適切なインデントと構造化
- 意味のある関数名
- 冗長なコメントの削除

### 3. 使用方法

1. プロジェクトファイルをWebサーバーに配置
2. `index.html`をブラウザで開く
3. VRヘッドセットまたはデスクトップで操作

### 4. 今後の拡張性

- 新しいコンポーネントは`js/components.js`に追加
- ゲーム機能は`js/game.js`に追加
- UIスタイルは`css/styles.css`に追加
- 設定変更は`GAME_CONFIG`オブジェクトで管理

## 技術スタック

- A-Frame 1.5.0
- A-Frame Extras 7.0.0
- A-Frame Physics System 4.0.1
- Vanilla JavaScript
- HTML5/CSS3