import React from 'react';

interface squareProps {
    value: string,
    clickHandler: () => void
}

const Square = (props: squareProps) => {
    return (
        <div className="square" onClick={props.clickHandler}>
            { props.value }
        </div>
    )
}

export default Square;