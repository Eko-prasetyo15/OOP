import MesinHitung from './MesinHitung.js';
const Pi = 22/ 7;

var mh = new MesinHitung();
// mh.learn("ES6 Module")

mh.add(10).substract(5).result();
mh.add(3).multiply(4).divide(6).result();
mh.x = 7;
console.log(`nilai sekarang : ${mh.x}`);
mh.multiply(2).multiply(Pi).result();
mh.x = 7;
mh.square().multiply(Pi).result();
mh.x = 4;
mh.exponent(3).result();
mh.squareRoot().result();