function check() {
  const posts = document.querySelectorAll(".post");
  // posts配列に.post selectorの要素を格納

  posts.forEach(function (post) {
  // posts配列の要素数分for文を実行

    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true")
    // setIntervalの再読み込みで複数回呼び出さないように設定

    post.addEventListener("click", () => {
    // クリックした時の動作を設定する
      const postId = post.getAttribute("data-id");
      // postIdのdata-idを取得
      const XHR = new XMLHttpRequest();
      // XHRを生成 Ajaxを使用可能に
      XHR.open("GET", `/posts/${postId}`, true);
      // openでリクエストを初期化、メソッドやパスを指定。
      XHR.responseType = "json";
      // レスポンスにjson形式を指定
      XHR.send();
      // sendでリクエストを送信

      XHR.onload = () => {
      // レスポンスなどを受信した時の動きをonloadで設定
        if (XHR.status != 200) {
        // http statusを解析 200は正常な値
          alert(`Error ${XHR.status}: ${XHR.statusText}`)
          return null;
          エラーをalertし処理を中断
        }
        const item = XHR.response.post;
        // itemにレスポンスのデータを格納
        if (item.checked === true) {
        // アイテムが既読かcheckedの値を確認
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        } // データを編集
      }
    });
  });
}
setInterval(check, 1000);
// 1000msごとにcheckを実行