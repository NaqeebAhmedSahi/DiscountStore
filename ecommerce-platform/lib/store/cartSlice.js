import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

const initialState = {
  items: loadCartFromStorage(),
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize, selectedColor, quantity = 1 } = action.payload;
      
      // Create a unique cart item ID based on product ID, size, and color
      const cartItemId = `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;
      
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.cartItemId === cartItemId);
      
      // Determine available stock and clamp
      const availableStock = (product && typeof product.stockQuantity === 'number') ? product.stockQuantity : (product && product.maxQuantity) || 10;
      const addQuantity = Math.max(1, Math.min(quantity, availableStock));

      if (existingItem) {
        // Update quantity if item already exists, but don't exceed available stock
        const newQty = Math.min(existingItem.quantity + addQuantity, availableStock);
        existingItem.quantity = newQty;
        existingItem.totalPrice = parseFloat(existingItem.price) * existingItem.quantity;
        existingItem.inStock = newQty > 0;
        existingItem.maxQuantity = availableStock;
      } else {
        // Add new item to cart
        const newItem = {
          cartItemId,
          id: product.id,
          name: product.name,
          price: parseFloat(product.price) || 0,
          originalPrice: parseFloat(product.originalPrice) || 0,
          image: product.image,
          brand: product.brand,
          category: product.category,
          originalUrl: product.originalUrl || null,
          selectedSize: selectedSize || 'One Size',
          selectedColor: selectedColor || 'Default',
          quantity: addQuantity,
          totalPrice: (parseFloat(product.price) || 0) * addQuantity,
          inStock: (product.inStock !== false) && (addQuantity > 0),
          maxQuantity: availableStock,
          discount: product.discount || 0,
          sku: product.sku || `SKU-${product.id}`,
        };
        
        state.items.push(newItem);
      }
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    removeFromCart: (state, action) => {
      const cartItemId = action.payload;
      state.items = state.items.filter(item => item.cartItemId !== cartItemId);
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find(item => item.cartItemId === cartItemId);
      
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items = state.items.filter(item => item.cartItemId !== cartItemId);
        } else {
          // Update quantity and total price
          const clamped = Math.min(quantity, item.maxQuantity || 10);
          item.quantity = clamped;
          item.totalPrice = parseFloat(item.price) * item.quantity;
        }
        
        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
    
    // Initialize cart from localStorage (useful for SSR)
    initializeCart: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  initializeCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (parseFloat(item.totalPrice) || (parseFloat(item.price) || 0) * item.quantity), 0);
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartItemById = (cartItemId) => (state) => 
  state.cart.items.find(item => item.cartItemId === cartItemId);

// Calculate cart summary
export const selectCartSummary = (state) => {
  const items = state.cart.items;
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (parseFloat(item.totalPrice) || (parseFloat(item.price) || 0) * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  return {
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    items,
  };
};

export default cartSlice.reducer;
