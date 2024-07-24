    // 计算rem
    const docEl = document.documentElement;
    const clientWidth = docEl.clientWidth;
    docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    window.onresize = function () {
      const clientWidth = docEl.clientWidth;
      docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    };