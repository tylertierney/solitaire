import type { CSSProperties } from 'react'

type Props = {
  style?: CSSProperties
  className?: string
}

export function Spade({ style = {}, className = '' }: Props) {
  return (
    <svg
      className={className}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
    >
      <path
        fill='inherit'
        d='M9.996 40c7.211-1.603 7.987-5.826 8.531-13.594-1.253 2.075-3.531 3.607-7.25 3.594-6.112-.021-10.207-3.576-8.75-11.25C3.996 11.013 14.996 8.013 19.996 0c5 8.013 16 11.013 17.469 18.75 1.456 7.674-2.469 11.228-8.75 11.25-3.719.013-5.997-1.519-7.25-3.594.544 7.768 1.319 11.991 8.531 13.594h-20z'
      />
    </svg>
  )
}

export function Diamond({ style = {}, className = '' }: Props) {
  return (
    <svg
      className={className}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
    >
      <path
        fill='inherit'
        d='M20 0c4 11 9 16 20 20-11 4-16 9-20 20-4-11-9-16-20-20 11-4 16-9 20-20z'
      />
    </svg>
  )
}

export function Heart({ style = {}, className = '' }: Props) {
  return (
    <svg
      className={className}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
    >
      <path
        fill='inherit'
        d='M20 10c.97-5 2.911-10 9.702-10 6.792 0 12.128 5 9.703 15C36.979 25 25.821 30 20 40 14.179 30 3.021 25 .595 15-1.83 5 3.505 0 10.298 0 17.089 0 19.03 5 20 10z'
      />
    </svg>
  )
}

export function Club({ style = {}, className = '' }: Props) {
  return (
    <svg
      className={className}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
    >
      <path
        fill='inherit'
        d='M20 0c-4.731 0-8.571 4.032-8.571 9 .041 3.126 1.654 5.768 3.333 8.281-1.871-1.416-3.951-2.272-6.19-2.281C3.84 15 0 19.032 0 24s3.84 9 8.571 9c3.833-.064 6.899-2.746 9.911-5-.539 6.733-1.635 10.514-8.006 12h19.048c-6.371-1.486-7.467-5.267-8.006-12 2.977 2.552 6.1 4.717 9.911 5C36.16 33 40 28.968 40 24s-3.84-9-8.571-9c-2.297 0-4.281 1.057-6.191 2.281 1.9-2.487 3.151-5.17 3.333-8.281 0-4.968-3.84-9-8.571-9z'
      />
    </svg>
  )
}
