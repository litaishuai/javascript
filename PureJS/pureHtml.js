const obj = {
  tt: 'Helllo',
  qq: 1213
};
if (obj.qq[Symbol.iterator] == Function) {
  obj.qq.map(e => {
    console.log(e)
  });
}
console.log("Hello World")