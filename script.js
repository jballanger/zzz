let volcanoDeg = 0;

function rotate(el = null, deg = 0) {
  if (el) {
    el.style['-ms-transform'] = `rotate(${deg}deg)`;
    el.style['-webkit-transform'] = `rotate(${deg}deg)`;
    el.style['transform'] = `rotate(${deg}deg)`;
    volcanoDeg = deg;
  }
}

function move(el = null, pos = null, rotation = null) {
  return new Promise((resolve, reject) => {
    if (!el) return reject('move() - Undefined element');
    pos = pos || { top: 0, left: 0 };
    const animate = setInterval(() => {
      let elTop = parseInt(el.style.top, 10);
      let elLeft = parseInt(el.style.left, 10);
      const final = (pos.top + pos.left);
      const current = (elTop + elLeft);
      let progress;
      if (current < final) progress = (current / final) * 100;
      if (final < current) progress = (final / current) * 100;
      if (rotation !== null) {
        if (volcanoDeg < rotation) rotate(el, ((rotation - volcanoDeg) * ((100 - progress) / 100)));
        if (rotation < volcanoDeg) rotate(el, ((volcanoDeg - rotation) * ((100 - progress) / 100)));
        //rotate(el, ((rotation / 100) * progress));
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
  const volcano = document.getElementById('volcano');
  rotate(volcano, -45);
  await move(volcano, { top: 120, left: 120 }, 0);
}

const hwButton = document.getElementById('hw');
if (hwButton) {
  hwButton.addEventListener('click', theEnd);
}