'use cilent'

import {ThemeProvider as NextThemeProvider, ThemeProviderProps} from 'next-themes'
import Header from '../layout/header'
import { cn } from '@/lib/utils'

interface ExtendedThemeProviderProps extends ThemeProviderProps{
    // children: React.ReactNode,  // already in for, extends ThemeProviderProps
    containerClassName?: string,
    // props?: object,
}

// ...props -> an object containing all the rest of the properties (from ThemeProviderProps).

export function ThemeProvider({children, containerClassName, ...props}: ExtendedThemeProviderProps) { // React.ComponentProps<typeof ThemeProviderProps> , we can also use it
    return (
        <NextThemeProvider {...props}>
            <Header/> {/* Header should be every other comp */}

            <main className={cn('container mx-auto px-4', containerClassName)}>
            {children}
            </main>
        </NextThemeProvider>
    )
}