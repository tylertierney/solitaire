import type { SVGProps } from 'react'

export const RefreshIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 25 25'
      {...props}
    >
      <path
        stroke='inherit'
        strokeWidth='inherit'
        d='M5.885 17A8 8 0 1 0 4.5 12.5v1'
      />
      <path stroke='inherit' strokeWidth={1.2} d='m7 11-2.5 2.5L2 11' />
    </svg>
  )
}
