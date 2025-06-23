import React from "react";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input className="input input-bordered w-full " {...props} />
    )
}

export default Input;