import { Component } from 'react'
import { ContactPage } from './ContactPage'
import { StatisticPage } from './StatisticPage'
import { MovesList } from '../cmps/MovesList'

import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.service'

export class HomePage extends Component {
    state = {
        currUser: null,
        userBitcoin: null,
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = async () => {

        try {
            const user = userService.getUser()
            // if (!user) return this.props.history.push('/signup')
            const userBitcoin = await bitcoinService.getRate(user.coins)
            this.setState({ currUser: user, userBitcoin })
        } catch (err) {
            console.log(err)
        }
    }

    get moves() {
        return this.state.currUser.moves.length > 5
            ? this.state.currUser.moves.slice(-5)
            : this.state.currUser.moves
    }

    // async _getRate(coins) {
    //     try {
    //         return await bitcoinService.getRate(coins)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    render() {
        const { currUser, userBitcoin } = this.state
        if (!currUser) return <div>Lodaing...</div>

        return (
            <section className='home-container flex column'>
                <section className='home-page'>
                    <section>
                        <img src={currUser.imgUrl} alt='contact' className='avatar' />
                    </section>
                    <section className='user-wallet'>
                        <h2>{currUser.name}'s wallet</h2>
                        <h3>
                            <span>Coins:</span> {currUser.coins}
                        </h3>
                        <h3>
                            <span>Bitcoin value:</span> {userBitcoin}
                        </h3>
                    </section>
                </section>
                {!!currUser.moves.length && (
                    <section>
                        <MovesList title='your last moves' movesList={this.moves} />
                    </section>
                )}
            </section>
        )
    }
}
