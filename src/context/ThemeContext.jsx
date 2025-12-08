import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [isExploding, setExplosionState] = useState(false)

    return (
        <ThemeContext.Provider value={{ isExploding, setExplosionState }}>
            {children}
        </ThemeContext.Provider>
    )
}
