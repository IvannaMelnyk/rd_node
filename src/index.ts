// Підключаємо модуль для роботи з датою та часом
const { performance: any } = require("perf_hooks");

// Функція для генерації випадкових чисел в діапазоні
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функція для генерації випадкового продукту та ціни
function generateProduct() {
  const products = [
    "Продукт 1",
    "Продукт 2",
    "Продукт 3",
    "Продукт 4",
    "Продукт 5",
  ];
  const randomProduct = products[getRandomNumber(0, products.length - 1)];
  const randomPrice = getRandomNumber(1, 1000);
  return { product: randomProduct, price: randomPrice };
}

// product with 1000 fields
const dataStructure = [];
for (let i = 0; i < 1000; i++) {
  const product = generateProduct();
  dataStructure.push(product);
}

// when created
const creationStartTime = performance.now();
console.log("Час створення об'єкта:", creationStartTime);

const accessStartTime = performance.now();
const elementAtIndex50 = dataStructure[49];

console.log("Час доступу до 50-го елемента:", accessStartTime);
console.log("50-й елемент:", elementAtIndex50);
