import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export { CartContext }
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  // Initialize from localStorage
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('sa_cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
      return []
    }
  })

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sa_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch (e) {
      console.error('Failed to load user from localStorage', e)
      return null
    }
  })

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('sa_cart', JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [items])

  // Listen for user changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedUser = localStorage.getItem('sa_user')
        setUser(savedUser ? JSON.parse(savedUser) : null)
      } catch (e) {
        console.error('Failed to update user', e)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  function addItem(product, qty = 1){
    setItems(prev => {
      const found = prev.find(p => p.id === product.id)
      if(found){
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      }
      return [...prev, { ...product, qty }]
    })
  }

  function removeItem(id){
    setItems(prev => prev.filter(p => p.id !== id))
  }

  function updateQty(id, qty){
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  }

  function clear(){ 
    setItems([])
    localStorage.removeItem('sa_cart')
  }

  const subtotal = items.reduce((s,p)=> s + p.price * p.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, subtotal, user, setUser }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
