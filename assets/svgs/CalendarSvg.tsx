import * as React from "react"

function CalenderSvg(props:any) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)" fill={props.color}>
        <path d="M19.48 22H2.52C1.13 22 0 20.87 0 19.48V4.353c0-1.39 1.13-2.52 2.52-2.52h16.96c1.39 0 2.52 1.13 2.52 2.52V19.48C22 20.87 20.87 22 19.48 22zM2.52 3.21c-.63 0-1.145.514-1.145 1.145V19.48c0 .632.514 1.146 1.146 1.146h16.958c.632 0 1.146-.514 1.146-1.146V4.354c0-.631-.514-1.146-1.146-1.146H2.521z" />
        <path d="M21.313 8.709H.688a.688.688 0 010-1.375h20.625a.688.688 0 010 1.375zM5.271 5.5a.688.688 0 01-.687-.688V.688a.688.688 0 011.375 0v4.125c0 .38-.308.688-.688.688zM16.729 5.5a.688.688 0 01-.688-.688V.688a.688.688 0 011.375 0v4.125c0 .38-.308.688-.688.688z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CalenderSvg
