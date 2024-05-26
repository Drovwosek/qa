 export class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addProduct(product) {
    if (!product.isAvailable()) {
      return;
    }

    const existingProductIndex = this.items.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
      this.items[existingProductIndex].quantity += product.quantity;
    } else {
      this.items.push(product);
    }
    this.calculateTotal();
  }

  removeProduct(product) {
    const productIndex = this.items.findIndex(item => item.name === product.name);

  }

  updateProductQuantity(product, quantity) {
    // Проверяем, доступно ли такое количество
    if (!product.isAvailable()) {
      return;
    }

  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  clear() {
    this.items = [];
    this.total = 0;
  }
}
