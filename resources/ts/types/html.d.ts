import "react"

declare module 'react' {
    interface OptionHTMLAttributes<T> {
        name?: string
    }
}