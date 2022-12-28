import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'
import { SignupPage } from './views/SignupPage'
import { ContactPage } from './views/ContactPage'
import { StatisticPage } from './views/StatisticPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'

import './App.css'
import './assets/style/main.scss'
import { userService } from './services/user.service'
import { AppFooter } from './cmps/AppFooter'

function PrivateRoute({ children }) {
    const user = userService.getUser()
    return user ? children : <Navigate to='/signup' />
}

function App() {

    return (
        <Router>
            <header className='full'>
                <AppHeader />
            </header>
            <main className='container main-app'>
                <Routes>
                    {/* <HomePage /> */}
                    <Route path='/contact/edit/:id' element={<ContactEdit />} />
                    <Route path='/contact/edit/' element={<ContactEdit />} />
                    <Route path='/contact/:id' element={<ContactDetails />} />
                    <Route path='/contact' element={<PrivateRoute >
                        <ContactPage />
                    </PrivateRoute>} />
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/stats' element={<PrivateRoute >
                        <StatisticPage />
                    </PrivateRoute>} />
                    <Route path='/' element={<PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                    } />
                </Routes>
            </main>
            <footer className='full'>
                <AppFooter/>
            </footer>
        </Router>
    )
}

export default App
