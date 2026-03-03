import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import QuoteListPage from '../features/quotes/pages/QuoteListPage';
import QuoteCreatePage from '../features/quotes/pages/QuoteCreatePage';
import QuoteDetailPage from '../features/quotes/pages/QuoteDetailPage';
import QuoteEditPage from '../features/quotes/pages/QuoteEditPage';

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/quotes" replace />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/quotes/create" element={<QuoteCreatePage />} />
        <Route path="/quotes/:id" element={<QuoteDetailPage />} />
        <Route path="/quotes/:id/edit" element={<QuoteEditPage />} />
      </Routes>
    </MainLayout>
  );
}
