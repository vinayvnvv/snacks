const React  = (() => {
  let hooks = [];
  let idx = 0;
  let Component;
  function useState(initVal) {
    let state = hooks[idx] || initVal;
    let _idx = idx;
    let setState = newVal => {
      hooks[_idx] = newVal;
      if(Component) render(Component);
    }
    idx++;
    return [state, setState];
  }
  function useEffect(cb, depArr) {
    const oldDeps = hooks[idx];
    let hasChanged = true;
    if(oldDeps) {
      hasChanged = depArr.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if(hasChanged) cb();
    hooks[idx] = depArr;
    idx++;
  }
  function render(Com) {
    Component = Com;
    idx = 0;
    let C = Com();
    C.render();
    return C;
  }
  return {useState, render, useEffect}
})()


function Component() {
  const [count, setCount] = React.useState(1)
  const [name, setName] = React.useState('Vinay')
  React.useEffect(() => {
    console.log('changed name')
  }, [name])
  React.useEffect(() => {
    console.log('changed count')
  }, [count])
  return {
    render: () => {
      console.log({count, name});
    },
    click: (num) => {
      setCount(num);
    },
    changeName: (v) => {
      setName(v);
    }
  }
}

var app = React.render(Component);
app.click(2);
app.click(3);
// var app = React.render(Component);
app.changeName('yadav');
// var app = React.render(Component);
app.changeName('viay');
// var app = React.render(Component);
