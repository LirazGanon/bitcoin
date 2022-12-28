import { Link } from 'react-router-dom'
import { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'

import { contactService } from '../services/contact.service'

export class ContactPage extends Component {
    state = {
        contacts: null,
        filterBy: {
            term: '',
        },
    }

    async componentDidMount() {
        try {
            const contacts = await contactService.getContacts()
            this.setState({ contacts })
        } catch (err) {
            console.log(err)
        }
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        } catch (err) {
            console.log(err)
        }
    }

    setFilterBy = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }

    setContact = async (contactId) => {
        try {
            const contact = await contactService.getContactById(contactId)
            this.setState({ currContact: contact })
        } catch (err) {
            console.log(err)
        }
    }

    onRemove = async (contactId) => {
        try {
            await contactService.deleteContact(contactId)
            this.loadContacts()
        } catch (err) {
            console.log('err: ', err)
        }
    }

    render() {
        const { contacts, filterBy } = this.state

        if (!contacts) return <div className='loading'>Loading...</div>

        return (
            <section className='contact-page flex column align-center'>
                <ContactFilter onFilterBy={this.setFilterBy} filterBy={filterBy} />
                <Link to='/contact/edit' className='add-contact'>
                    Add Contact
                </Link>
                <ContactList onRemove={this.onRemove} contacts={contacts} />
            </section>

        )
    }
}
