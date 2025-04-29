import type { SVGProps } from 'react'

export function Signature(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="100"
      viewBox="0 0 300 100"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '48px',
          fontWeight: 'bold'
        }}
      >
        Swarnendu
      </text>
    </svg>
  )
}