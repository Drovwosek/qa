class Product {
  constructor(name, price, quantity = 1, stock = 10, availability = true) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.stock = stock;
    this.availability = availability;
  }

  isAvailable() {
    return this.quantity < this.stock && this.availability;
  }
}
