import { Link } from 'react-router-dom'
import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onRemove }) {
    return (
        <section className='contact-list'>
            <ul className='contacts'>
                {contacts.map((contact) => (
                    <li key={contact._id} className='contact-item'>
                        <ContactPreview onRemove={onRemove} contact={contact} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
