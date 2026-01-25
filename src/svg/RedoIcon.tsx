import type { SVGProps } from 'react'

export const RedoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        stroke='inherit'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='inherit'
        d='M20 7H9c-1.87 0-2.804 0-3.5.402A3 3 0 0 0 4.402 8.5C4 9.196 4 10.13 4 12s0 2.804.402 3.5A3 3 0 0 0 5.5 16.598C6.196 17 7.13 17 9 17h7m4-10-3-3m3 3-3 3'
      />
    </svg>
  )
}
