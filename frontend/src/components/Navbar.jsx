// frontend/src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className='bg-blue-600 p-4 text-white flex justify-between'>
            <div>
                <Link to="/" className='mr-4'>Home</Link>
                {user && <Link to="/tweets" className='mr-4'>Tweets</Link>}
            </div>
            <div>
                { user ? (
                    <>
                        <Link to={`/users/${user.username}/profile`} className='mr-4'>{user.username}</Link>
                        <Link to="/notifications" className='mr-4'>Notifications</Link>
                        <button onClick={logout} className='bg-red-500 px-3 py-1 rounded'>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='mr-4'>Login</Link>
                        <Link to="/register" className='bg-green-500 px-3 py-1 rounded'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;