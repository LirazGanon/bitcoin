import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'

export const ContactDetails = () => {
  const [currContact, setCurrContact] = useState(null)
  const [loggedinUser, setLoggedinUser] = useState(null)
  const params = useParams()

  useEffect(() => {
    loadContact()
    loadLoggedinUser()
  }, [params.id])

  async function loadContact() {
    try {
      const contact = await contactService.getContactById(params.id)
      setCurrContact(contact)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  async function loadLoggedinUser() {
    const loggedinUser = await userService.getUser()
    console.log(loggedinUser)
    if (loggedinUser) setLoggedinUser(loggedinUser)
  }

  function onTransferCoins(amount) {
    const updatedUser = userService.addMove(currContact, amount)
    setLoggedinUser(updatedUser)
  }

  function getMovesToContact() {
    console.log(loggedinUser)
    let moves = loggedinUser.moves?.filter((move) => move.toId === currContact._id)
    return moves
  }

  // function onBack() {
  //   history.push('/contact')
  // }

  if (!currContact) return <div className='loading'>Loading...</div>

  return (
    <section className='flex column align-center'>
      <section className='contact-details'>
        <img src={currContact.imgUrl} alt='contact-image' />
        <div className='info'>
          <h2>{currContact.name}</h2>
          <h3>
            <span>Email:</span>
            {currContact.email}
          </h3>
          <h3>
            <span>Phone:</span>
            {currContact.phone}
          </h3>
        </div>
        {/* <Link to='/contact/5a56640298ab77236845b82b'>Next Contact</Link> */}
      </section>

      <section>
        {loggedinUser && (
          <TransferFund
            contact={currContact}
            maxCoins={loggedinUser.coins}
            onTransferCoins={onTransferCoins}
          />
        )}
        {!!getMovesToContact().length && (
          <MovesList
            title={`your moves with ${currContact.name}`}
            movesList={getMovesToContact()}
          />
        )}
      </section>
    </section>
  )
}
