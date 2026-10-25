import React, { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAccount, logoutUser as logoutAction } from '../store/slices/portfolioSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const activeAccountId = useSelector((state) => state.portfolio.activeAccountId);
  const accounts = useSelector((state) => state.portfolio.accounts);

  const [authError, setAuthError] = useState('');

  const login = (accountId) => {
    const formattedId = accountId.trim().toUpperCase();
    if (accounts[formattedId]) {
      dispatch(setActiveAccount(formattedId));
      setAuthError('');
      return true;
    } else {
      setAuthError('Invalid Account ID. Try TRADER001, TRADER002, or TRADER003.');
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    setAuthError('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!activeAccountId, activeAccountId, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);