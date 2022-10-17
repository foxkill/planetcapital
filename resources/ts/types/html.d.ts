import "react"

declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface OptionHTMLAttributes<T> {
        name?: string
    }
}