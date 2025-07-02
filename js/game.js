// ゲームロジック管理

// グローバル変数
window.isFilling = false;
window.fillCount = 0;
window.fillCountText = null;

// ゲーム設定
const GAME_CONFIG = {
  GAP_COUNT: 70,
  PIECE_WIDTH_RATIO: 0.5,
  GAP_Y: 1.11,
  GAP_Z: -4,
  PIECE_HEIGHT: 0.03,
  PIECE_DEPTH: 0.18,
  DEMO_DELAY: 500,
  FILL_INTERVAL: 200
};

// ゲーム初期化
function initializeGame() {
  window.fillCountText = document.getElementById('fill-count-text');
  createGapColliders();
  setupEventListeners();
}

// 隙間コライダーの作成
function createGapColliders() {
  const gapColliders = document.getElementById('gap-colliders');
  
  for (let i = 0; i < GAME_CONFIG.GAP_COUNT; i++) {
    const pieceWidth = GAME_CONFIG.PIECE_WIDTH_RATIO / GAME_CONFIG.GAP_COUNT;
    const x = -GAME_CONFIG.PIECE_WIDTH_RATIO / 2 + pieceWidth / 2 + pieceWidth * i;
    
    const box = document.createElement('a-box');
    box.setAttribute('position', `${x} ${GAME_CONFIG.GAP_Y} ${GAME_CONFIG.GAP_Z}`);
    box.setAttribute('width', pieceWidth);
    box.setAttribute('height', GAME_CONFIG.PIECE_HEIGHT);
    box.setAttribute('depth', GAME_CONFIG.PIECE_DEPTH);
    box.setAttribute('opacity', '0');
    box.setAttribute('transparent', 'true');
    box.setAttribute('class', 'clickable');
    box.setAttribute('fill-gap-on-mousedown', `index: ${i}; count: ${GAME_CONFIG.GAP_COUNT}`);
    box.setAttribute('static-body', '');
    
    gapColliders.appendChild(box);
  }
}

// イベントリスナーの設定
function setupEventListeners() {
  // リセットボタン
  document.getElementById('reset-btn').addEventListener('click', resetGame);
  
  // お手本ボタン
  document.getElementById('demo-btn').addEventListener('click', showDemo);
}

// ゲームリセット
function resetGame() {
  // 埋めたa-boxを削除
  document.querySelectorAll('a-box').forEach(box => {
    const color = box.getAttribute('color');
    if (color === '#FF0000' || color === '#000000') {
      box.parentNode.removeChild(box);
    }
  });
  
  // 各fill-gap-on-mousedownのfilled状態もリセット
  document.querySelectorAll('[fill-gap-on-mousedown]').forEach(el => {
    if (el.components['fill-gap-on-mousedown']) {
      el.components['fill-gap-on-mousedown'].filled = false;
    }
  });
  
  // カウントもリセット
  window.fillCount = 0;
  window.fillCountText.setAttribute('value', `埋めた数: 0 / ${GAME_CONFIG.GAP_COUNT}`);
}

// お手本表示
function showDemo() {
  resetGame();
  
  const pieces = Array.from(document.querySelectorAll('[fill-gap-on-mousedown]'));
  let i = 0;

  function fillNext() {
    if (i >= pieces.length) return;
    const comp = pieces[i].components['fill-gap-on-mousedown'];
    if (comp && !comp.filled) {
      comp.el.emit('mousedown');
      i++;
      setTimeout(fillNext, GAME_CONFIG.FILL_INTERVAL);
    } else {
      i++;
      fillNext();
    }
  }

  if (pieces.length > 0) {
    setTimeout(fillNext, GAME_CONFIG.DEMO_DELAY);
  }
}

// DOMコンテンツロード時にゲーム初期化
document.addEventListener('DOMContentLoaded', function() {
  // A-Frameシーンの読み込み完了を待つ
  document.querySelector('a-scene').addEventListener('loaded', function() {
    initializeGame();
  });
});
