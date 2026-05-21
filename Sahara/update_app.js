const fs = require('fs');
let code = fs.readFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', 'utf8');
const txt = fs.readFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/new_products_array.txt', 'utf8');

let newArray = txt.replace('const NEW_PRODUCTS', 'const INITIAL_PRODUCTS');
newArray = newArray.replace(/image:\s*"([^"]+)"/g, 'image: "$1", images: ["$1", "$1"]');

const initProdRegex = /const INITIAL_PRODUCTS = \[[^]*?\];/;
code = code.replace(initProdRegex, newArray);

fs.writeFileSync('c:/Users/Lenovo/Desktop/Sahara/Sahara/frontend/src/App.js', code);
console.log('Replaced INITIAL_PRODUCTS successfully');
