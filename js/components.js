// A-Frame VR 移動テスト用コンポーネント

// 隙間埋めコンポーネント
AFRAME.registerComponent('fill-gap-on-mousedown', {
  schema: {
    index: {type: 'int'},
    count: {type: 'int', default: 70}
  },
  init: function () {
    var el = this.el;
    var data = this.data;
    var scene = document.querySelector('a-scene');
    this.filled = false;

    // ピースの埋め処理
    function fill() {
      if (el.components['fill-gap-on-mousedown'].filled) return;
      var pieceWidth = 0.5 / data.count;
      var x = -0.25 + pieceWidth / 2 + pieceWidth * data.index;
      var filler = document.createElement('a-box');
      filler.setAttribute('position', `${x} 1.11 -3.96`);
      filler.setAttribute('width', pieceWidth);
      filler.setAttribute('height', '0.02');
      filler.setAttribute('depth', '0.05');
      filler.setAttribute('color', '#FF0000'); // 赤色
      scene.appendChild(filler);
      el.components['fill-gap-on-mousedown'].filled = true;
      
      // 0.1秒後にfillerを黒くする
      setTimeout(() => {
        filler.setAttribute('color', '#000000');
      }, 100);

      // カウントを増やして表示を更新
      window.fillCount++;
      window.fillCountText.setAttribute('value', `Filled blocks: ${window.fillCount} 個 / ${data.count} 個`);
    }

    // 外部から呼び出せる
    this.fillByStick = fill;

    // イベントリスナーの追加
    el.addEventListener('click', function () {
      window.isFilling = true;
      fill();
    });
    
    el.addEventListener('triggerdown', function () {
      window.isFilling = true;
      fill();
    });
    
    el.addEventListener('gripdown', function () {
      window.isFilling = true;
      fill();
    });
  }
});

// 棒の先端リスナーコンポーネント
AFRAME.registerComponent('stick-tip-listener', {
  init: function () {
    this.el.addEventListener('collidestart', function (evt) {
      if (evt.detail.body.el && evt.detail.body.el.components['fill-gap-on-mousedown']) {
        evt.detail.body.el.components['fill-gap-on-mousedown'].fillByStick();
      }
    });
  }
});

// カメラZ軸制限コンポーネント
AFRAME.registerComponent('camera-z-limit', {
  tick: function () {
    const pos = this.el.getAttribute('position');
    // 制限なしにする場合は何もしない
  }
});

// サムスティック移動コンポーネント
AFRAME.registerComponent('thumbstick-move', {
  schema: {speed: {default: 0.05}},
  init: function () {
    this.el.addEventListener('thumbstickmoved', (evt) => {
      const cam = this.el.object3D;
      // カメラの向きに合わせて前後左右移動
      const dir = new THREE.Vector3();
      cam.getWorldDirection(dir);
      // 前後（z方向）
      const moveZ = -evt.detail.y * this.data.speed;
      // 左右（x方向）: カメラの右ベクトルを計算
      const right = new THREE.Vector3();
      right.crossVectors(dir, cam.up).normalize();
      const moveX = evt.detail.x * this.data.speed;
      cam.position.x += dir.x * moveZ + right.x * moveX;
      cam.position.z += dir.z * moveZ + right.z * moveX;
    });
    
    this.el.addEventListener('trackpadmoved', (evt) => {
      const cam = this.el.object3D;
      const dir = new THREE.Vector3();
      cam.getWorldDirection(dir);
      const moveZ = -evt.detail.y * this.data.speed;
      const right = new THREE.Vector3();
      right.crossVectors(dir, cam.up).normalize();
      const moveX = evt.detail.x * this.data.speed;
      cam.position.x += dir.x * moveZ + right.x * moveX;
      cam.position.z += dir.z * moveZ + right.z * moveX;
    });
  }
});
