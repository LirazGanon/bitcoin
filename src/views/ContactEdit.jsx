import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contactService } from '../services/contact.service';

export function ContactEdit() {
  const [currContact, setCurrContact] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContact() {
        console.log(params.id)
      try {
        const contact = params.id
          ? await contactService.getContactById(params.id)
          : contactService.getEmptyContact();
        setCurrContact(contact);
        console.log(contact);
      } catch (err) {
        console.log('err: ', err);
      }
    }

    fetchContact();
  }, [params.id]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value;
        break;
      case 'checkbox':
        value = target.checked;
        break;
      default:
        break;
    }

    setCurrContact((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  async function onAddContact(ev) {
    ev.preventDefault();
    try {
      await contactService.saveContact({ ...currContact });
      navigate('/contact');
    } catch (err) {
      console.log('err: ', err);
    }
  }

  function onBack() {
    navigate('/contact');
  }

  if (!currContact) return;


  const { name, email, phone } = currContact

  return (
            <section className='contact-edit'>
                <h2>{currContact._id ? 'Edit Contact' : 'Add Contact'}</h2>
                {currContact._id && (
                    <img src={currContact.imgUrl} alt='contact' className='contact-avatar' />
                )}
                <form onSubmit={onAddContact}>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        value={name}
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Name'
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        value={email}
                        type='text'
                        name='email'
                        id='email'
                        placeholder='Email'
                    />
                    <label htmlFor='phone'>Phone</label>
                    <input
                        onChange={handleChange}
                        value={phone}
                        type='text'
                        name='phone'
                        id='phone'
                        placeholder='Phone'
                    />
                    <div className='action-btns flex justify-center'>
                        <button
                            className='secondary'
                            onClick={(ev) => {
                                ev.stopPropagation()
                                onBack()
                            }}
                        >
                            Back
                        </button>
                        <button className='primary'>Save</button>
                    </div>
                </form>
            </section>
        )
    
}
