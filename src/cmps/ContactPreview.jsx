import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemove }) {
    return (
        <section className='contact-container flex column space-between'>
            <Link to={`/contact/${contact._id}`}>
                <div className='contact-preview'>
                    <img src={contact.imgUrl} alt='contact-img' />
                    <div className='details'>
                        <h3>{contact.name}</h3>
                    </div>
                </div>
            </Link>
            <section className='actions'>
                <button
                    onClick={(ev) => {
                        ev.preventDefault()
                        onRemove(contact._id)
                    }}
                    className='remove'
                >
                    Remove
                </button>
                <Link to={`/contact/edit/${contact._id}`} className='edit'>
                    Edit
                </Link>
            </section>
        </section>
    )
}
