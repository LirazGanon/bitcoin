import React from 'react'

export function MovesList({ title, movesList }) {

    function formatTime(time) {
        return Date(time).slice(4, 21)
    }

    return (
        <section className='moves-list'>
            <h2>{title}</h2>
            <ul className='moves-details'>
                {movesList.map((move, idx) => (
                    <li key={move.at}>
                        <h3>#: {idx + 1}</h3>
                        <h3>To: {move.to}</h3>
                        <h3>Date: {formatTime(move.at)}</h3>
                        <h3 className='move-amount'>Amount: ${move.amount}</h3>
                    </li>
                ))}
            </ul>
        </section>
    )
}
