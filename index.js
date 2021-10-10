let data = [
  { value: 1, key: "as" },
  { value: 2, key: "ass" },
  { value: 3, key: "afs" },
  { value: 4, key: "aqqs" },
  { value: 5, key: "asdss" },
];

const Rama = function (_selector) {
  var selector = _selector;
  var realDom = [];
  const create = (data) => {
    const virtualDom = [];
    data.forEach((i) => {
      const el = document.createElement("div");
      el.innerHTML = i.value;
      virtualDom.push({ ref: el, value: i.value, key: i.key });
    });
    return virtualDom;
  };
  const append = (el, idx) => {
    const _selector = document.getElementById(selector);
    if (idx) {
      _selector.insertBefore(el, _selector.children[idx]);
    } else {
      _selector.append(el);
    }
  };
  const remove = (el) => {
    el.remove();
  };
  let maxStack = 0;
  const manipulateDom = (virtualDom) => {
    console.log(virtualDom, realDom);
    let VDIndex = 0;
    let RDIndex = 0;
    while (maxStack < 200) {
      maxStack++;
      console.log(RDIndex, VDIndex);
      if (VDIndex === virtualDom.length && RDIndex === realDom.length) {
        break;
      }
      if (VDIndex === virtualDom.length && RDIndex !== realDom.length) {
        remove(realDom[RDIndex].ref);
        RDIndex++;
        continue;
      }
      if (!realDom[RDIndex]) {
        append(virtualDom[VDIndex].ref);
        VDIndex++;
        continue;
      }
      if (realDom[RDIndex].key === virtualDom[VDIndex].key) {
        if (realDom[RDIndex].value !== virtualDom[VDIndex].value) {
          realDom[RDIndex].ref.innerHTML = virtualDom[VDIndex].value;
        }
        VDIndex++;
        RDIndex++;
      } else {
        append(virtualDom[VDIndex].ref, VDIndex);
        VDIndex++;
      }
    }
    realDom = virtualDom;
  };
  this.render = function (data) {
    manipulateDom(create(data));
  };
};

const dom = new Rama("app");

function createKeys(data) {
  return data.map((i, idx) => ({ ...i, key: idx }));
}
// data = createKeys(data);

dom.render(data);

// setTimeout(() => {
//   data.push({ value: "vinay", key: "sadsada" });
//   data = data
//     .slice(0, 2)
//     .concat([{ value: "hello", key: "sada" }].concat(data.slice(2)));
//   //   data = createKeys(data);
//   dom.render(data);
// }, 3000);

setTimeout(() => {
  data.pop();
  dom.render(data);
}, 3000);
