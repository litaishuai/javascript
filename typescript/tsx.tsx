function fun(hello: { message: string }) {
  console.log(hello.message);
}
const o = {
  message: 'Hello World',
};
fun(o);