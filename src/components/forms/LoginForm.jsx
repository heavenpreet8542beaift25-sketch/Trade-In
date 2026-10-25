import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const { login, authError } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      accountId: ''
    },
    validationSchema: Yup.object({
      accountId: Yup.string()
        .required('Account ID is required')
        .max(12, 'Account ID must be 12 characters or less')
    }),
    onSubmit: (values) => {
      const success = login(values.accountId);
      if (success) {
        navigate('/portfolio');
      }
    }
  });

  const handleDemoSelect = (accId) => {
    formik.setFieldValue('accountId', accId);
    const success = login(accId);
    if (success) {
      navigate('/portfolio');
    }
  };

  return (
    <div id="loginScreen">
      <article className="login-card">
        <div className="login-glow" />
        <div className="login-icon">🔐</div>
        <h1 className="login-title">Portfolio <span>Access</span></h1>
        <p className="login-sub">Enter your Trade-In account ID to view<br />your investment portfolio & analytics.</p>
        
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="login-input-wrap">
            <span className="login-input-icon">👤</span>
            <input
              id="accountId"
              name="accountId"
              className="login-input"
              type="text"
              placeholder="TRADER001"
              maxLength={12}
              aria-label="Account ID"
              aria-required="true"
              autoComplete="username"
              spellCheck="false"
              value={formik.values.accountId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          
          {(formik.touched.accountId && formik.errors.accountId) && (
            <div className="login-error" role="alert" style={{ display: 'block' }}>
              ❌ {formik.errors.accountId}
            </div>
          )}

          {authError && (
            <div className="login-error" role="alert" style={{ display: 'block' }}>
              ❌ {authError}
            </div>
          )}

          <button type="submit" className="login-btn">Access Portfolio →</button>
        </form>

        <nav className="login-accounts" aria-label="Demo accounts">
          <div className="login-accounts-title">Demo Accounts</div>
          <div className="demo-account" onClick={() => handleDemoSelect('TRADER001')} role="button" tabIndex={0}>
            <div>
              <div className="demo-id">TRADER001</div>
              <div className="demo-desc">Crypto-heavy • ₹8L invested</div>
            </div>
            <span>→</span>
          </div>
          <div className="demo-account" onClick={() => handleDemoSelect('TRADER002')} role="button" tabIndex={0}>
            <div>
              <div className="demo-id">TRADER002</div>
              <div className="demo-desc">Mixed Crypto + Forex • ₹4.4L</div>
            </div>
            <span>→</span>
          </div>
          <div className="demo-account" onClick={() => handleDemoSelect('TRADER003')} role="button" tabIndex={0}>
            <div>
              <div className="demo-id">TRADER003</div>
              <div className="demo-desc">Forex-focused • ₹3.1L</div>
            </div>
            <span>→</span>
          </div>
        </nav>
      </article>
    </div>
  );
};