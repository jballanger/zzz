function getDocumentSize() {
  const body = document.body;
  const html = document.documentElement;
  return {
    height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
    width: Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)
  };
}

function rotate(el = null, deg = 0) {
  if (el) {
    el.style['-ms-transform'] = `rotate(${deg}deg)`;
    el.style['-webkit-transform'] = `rotate(${deg}deg)`;
    el.style['transform'] = `rotate(${deg}deg)`;
  }
}

function entrance(el = null, pos = null, rotation = null) {
  return new Promise((resolve, reject) => {
    if (!el) return reject('entrance() - Undefined element');
    pos = pos || { top: 0, left: 0 };
    pos.top = parseInt(pos.top, 10);
    pos.left = parseInt(pos.left, 10);
    const animate = setInterval(() => {
      let elTop = parseInt(el.style.top, 10);
      let elLeft = parseInt(el.style.left, 10);
      const final = (pos.top + pos.left);
      const current = (elTop + elLeft);
      let progress;
      if (current < final) progress = (current / final) * 100;
      if (final < current) progress = (final / current) * 100;
      if (rotation !== null) {
        if (rotation.old < rotation.new) rotate(el, ((rotation.new - rotation.old) * ((100 - progress) / 100)));
        if (rotation.new < rotation.old) rotate(el, ((rotation.old - rotation.new) * ((100 - progress) / 100)));
      }
      if (elTop === pos.top && elLeft === pos.left) {
        clearInterval(animate);
        resolve();
      } else {
        if (elTop !== pos.top) {
          if (elTop < pos.top) elTop += 1;
          if (elTop > pos.top) elTop -= 1;
          el.style.top = `${elTop}px`;
        }
        if (elLeft !== pos.left) {
          if (elLeft < pos.left) elLeft += 1;
          if (elLeft > pos.left) elLeft -= 1;
          el.style.left = `${elLeft}px`;
        }
      }
    }, 5);
  });
}

function explosion(el = null, contrast = null, size = null) {
  return new Promise((resolve, reject) => {
    if (!el) return reject('explosion() - Undefined element');
    contrast = contrast || { new: 0, old: 0 };
    size = size || 0;
    let currentConstrast = contrast.old;
    const animate = setInterval(() => {
      let elHeight = parseInt(el.style.height, 10);
      let elWidth = parseInt(el.style.width, 10);
      if (currentConstrast === contrast.new && elHeight === size && elWidth === size) {
        clearInterval(animate);
        resolve();
      } else {
        if (elHeight !== size) {
          if (elHeight < size) elHeight += 2;
          if (elHeight > size) elHeight -= 2;
          el.style.height = `${elHeight}px`;
        }
        if (elWidth !== size) {
          if (elWidth < size) elWidth += 2;
          if (elWidth > size) elWidth -= 2;
          el.style.width = `${elWidth}px`;
        }
        if (currentConstrast !== contrast.new) {
          if (currentConstrast < contrast.new) currentConstrast += 1;
          if (currentConstrast > contrast.new) currentConstrast -= 1;
          el.style.filter = `contrast(${currentConstrast}%)`;
        }
      }
    }, 10);
  });
}

function fadeOut(el = null) {
  return new Promise((resolve, reject) => {
    if (!el) return reject('fadeOut() - Undefined element');
      const animate = setInterval(() => {
        let elOpacity = el.style.opacity || 1;
        if (elOpacity === 0) {
          clearInterval(animate);
          resolve();
        } else {
          if (elOpacity > 0) elOpacity -= 0.1;
          if (elOpacity < 0) elOpacity += 0.1;
          el.style.opacity = elOpacity;
        }
      }, 50);
  });
}

function remove(el = null) {
  if (el) {
    const parent = el.parentElement;
    if (parent) {
      parent.removeChild(el);
    }
  }
}

async function theEnd() {
  remove(hwButton);
  const documentSize = getDocumentSize();
  const volcano = document.getElementById('volcano');
  Object.assign(volcano.style, {
    display: 'block',
    top: `${documentSize.height}px`,
    left: `${documentSize.width}px`,
    width: '500px',
    height: '500px',
    filter: 'contrast(20%)'
  });
  rotate(volcano, -90);
  await entrance(volcano, { top: documentSize.height / 16, left: documentSize.width / 16 }, { old: -90, new: 0 });
  await explosion(volcano, { old: 20, new: 300 }, 1500);
  await fadeOut(volcano);
}

const hwButton = document.getElementById('hw');
if (hwButton) {
  hwButton.addEventListener('click', theEnd);
}