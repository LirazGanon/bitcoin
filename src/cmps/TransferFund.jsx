import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const TransferFund = ({ contact, maxCoins, onTransferCoins }) => {
    const [amount, setAmount] = useState('')
    const [msg, setMsg] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // componentDidMount logic goes here
    }, [])

    useEffect(() => {
        setMsg('')
    }, [amount])

    const onTransfer = (ev) => {
        ev.preventDefault()
        if (amount > maxCoins || amount < 1) {
            setMsg("can't complete request")
            return
        }
        onTransferCoins(amount)
        setAmount('')
        setMsg('')
    }

    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }

        setAmount(value)

    }

    const onBack = () => {
        navigate('/contact', { replace: true })
    }

    function coins() {
        return maxCoins > 10 ? 'green' : 'red'
    }

    return (
        <section className='transfer-fund'>
            <section className='transfer-details'>
                <h3>Transfer funds to:</h3>
                <h2>{contact.name}</h2>
                <form onSubmit={onTransfer}>
                    <input
                        value={amount}
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='insert amount'
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
                        <button className='primary'>Transfer</button>
                    </div>
                </form>
            </section>
            <p className={`user-balance ${coins()}`}>
                your current balance: {maxCoins}
            </p>
            {msg && <p className='msg'>{msg}</p>}
        </section>
    )
}
