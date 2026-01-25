/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'

type ThemeContextType = {
  darkTheme: boolean
  setDarkTheme: Dispatch<SetStateAction<boolean>>
}

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  setDarkTheme: () => ({}),
})

export function ThemeProvider({ children }: PropsWithChildren) {
  const [darkTheme, setDarkTheme] = useState(
    Boolean(JSON.parse(localStorage.getItem('dark-theme') ?? 'false')),
  )

  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-theme', JSON.stringify(true))
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('dark-theme', JSON.stringify(false))
    }
  }, [darkTheme])

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
