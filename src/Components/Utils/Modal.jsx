import React from "react"
import "./Modal.css"

export default function Modal({ children, toggle }) {
    return <div className="hwang-modal">
        { children }
    </div>
}