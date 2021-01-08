import * as React from "react"

function HappySvg(props:any) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm0 20.625A9.625 9.625 0 011.375 11 9.625 9.625 0 0111 1.375 9.625 9.625 0 0120.625 11 9.625 9.625 0 0111 20.625z"
        fill={props.color}
      />
      <path
        d="M7.563 8.938a1.375 1.375 0 100-2.75 1.375 1.375 0 000 2.75zM14.438 8.938a1.375 1.375 0 100-2.75 1.375 1.375 0 000 2.75zM15.813 11a4.812 4.812 0 11-9.626 0H4.813a6.187 6.187 0 1012.375 0h-1.375z"
        fill={props.color}
      />
    </svg>
  )
}

export default HappySvg
