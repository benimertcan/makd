import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken } from '../../actions/authActions';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Verify token on app load
        dispatch(verifyToken());
    }, [dispatch]);

    return children;
};

export default AuthProvider;
