import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { PortfolioPage } from '../pages/PortfolioPage';
import { AssetDetailPage } from '../pages/AssetDetailPage';
import { LoginForm } from '../components/forms/LoginForm';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route path="/asset/:assetId" element={<AssetDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};