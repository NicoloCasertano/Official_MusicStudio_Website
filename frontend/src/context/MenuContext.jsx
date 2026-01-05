import React, { createContext, useEffect, useState } from 'react'

export const MenuContext = createContext({ open: false, setOpen: () => {} })

export function MenuProvider({ children }) {
  // Open menu only when the visitor hasn't seen it yet
  const alreadySeen = typeof window !== 'undefined' && window.localStorage.getItem('sa_seen_menu')
  const [open, setOpen] = useState(!alreadySeen)

  useEffect(() => {
    // When menu is closed, mark that the visitor has seen it
    if (!open) {
      try { window.localStorage.setItem('sa_seen_menu', '1') } catch (e) {}
    }
  }, [open])

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MenuContext.Provider>
  )
}
