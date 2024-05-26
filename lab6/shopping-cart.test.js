import {ShoppingCart} from './shopping-cart.js'
import {Product} from './product'

jest.mock('./product'); // Мокируем класс Product

describe('ShoppingCart', () => {

    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    describe('addProduct', () => {
        it('should add a new product to the cart', () => {
            const product = new Product('Apple', 1.5);
            product.isAvailable.mockReturnValue(true);
            cart.addProduct(product);
            expect(cart.items).toEqual([product]);
        });

        it('should not add a product if it is not available', () => {
            const product = new Product('Apple', 1.5);
            product.isAvailable.mockReturnValue(false);
            cart.addProduct(product);
            expect(cart.items).toEqual([]);
        });

        it('should increase the quantity of an existing product', () => {
            const product = new Product('Apple', 1.5);
            product.isAvailable.mockReturnValue(true);
            cart.addProduct(product);
            cart.addProduct(product);
            expect(cart.items.toString()).toBe([new Product('Apple', 1.5, 2)].toString());
        });
    });

    describe('removeProduct', () => {
        it('should remove a product from the cart', () => {
            const product = new Product('Apple', 1.5);
            cart.addProduct(product);
            cart.removeProduct(product);
            expect(cart.items).toEqual([]);
        });

        it('should do nothing if the product is not in the cart', () => {
            const product = new Product('Orange', 2);
            cart.removeProduct(product);
            expect(cart.items).toEqual([]);
        });
    });

    describe('updateProductQuantity', () => {
        it('should update the quantity of an existing product', () => {
            const product = new Product('Apple', 1.5);
            product.isAvailable.mockReturnValue(true);
            cart.addProduct(product);
            cart.updateProductQuantity(product, 3);
            expect(cart.items.toString()).toBe([new Product('Apple', 1.5, 3)].toString());
        });

        it('should do nothing if the product is not in the cart', () => {
            const product = new Product('Orange', 2);
            cart.updateProductQuantity(product, 2);
            expect(cart.items.toString()).toBe([].toString());
        });

        it('should not update the quantity if it exceeds the stock', () => {
            const product = new Product('Apple', 1.5, 1, 5, true);
            product.isAvailable.mockReturnValue(true);
            cart.addProduct(product);
            cart.updateProductQuantity(product, 6); // 6 > 5 (stock)
            expect(cart.items.toString()).toBe([new Product('Apple', 1.5, 1, 5, true)].toString());
        });

        it('should not update the quantity if the product is not available', () => {
            const product = new Product('Apple', 1.5, 1, 5, false);
            product.isAvailable.mockReturnValue(false);
            cart.addProduct(product);
            cart.updateProductQuantity(product, 3);
            expect(cart.items.toString()).toBe([].toString());
        });
        it('продукта не хватило', () => {
            const product = new Product('Apple', 1.5, 20);
            cart.updateProductQuantity(product, 25);

            expect(cart.items.length).toBe(0);
        });
    });

    describe('calculateTotal', () => {
        it('should calculate the total price of all products in the cart', () => {
            const product1 = new Product('Apple', 1.5);
            const product2 = new Product('Orange', 2);
            cart.addProduct(product1);
            cart.addProduct(product2);
            expect(cart.total).toBe(0);
        });
    });

    describe('clear', () => {
        it('should clear the cart', () => {
            const product = new Product('Apple', 1.5);
            cart.addProduct(product);
            cart.clear();
            expect(cart.total).toBe(0);
        });
    });
});
