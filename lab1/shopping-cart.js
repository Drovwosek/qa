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
    if (productIndex !== -1) {
      this.items.splice(productIndex, 1);
      this.calculateTotal();
    }
  }

  updateProductQuantity(product, quantity) {
    // Проверяем, доступно ли такое количество
    if (quantity > product.stock || !product.availability) {
      return;
    }

    const productIndex = this.items.findIndex(item => item.name === product.name);
    if (productIndex !== -1) {
      this.items[productIndex].quantity = quantity;
      this.calculateTotal();
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
