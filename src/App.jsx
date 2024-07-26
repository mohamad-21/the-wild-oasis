import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import Cabins from './pages/Cabins';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Users from './pages/Users';
import Settings from './pages/Settings';
import { GlobalStyles } from './styles/GlobalStyles';
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import CheckIn from "./pages/CheckIn";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const queryClient = new QueryClient();
function App() {
  const { theme } = useTheme();

  const darkModeToastStyles = theme === 'dark-mode' ? {
    background: '#242f3f',
    color: '#fff'
  } : {};

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<Booking />} />
            <Route path="/checkin/:bookingId" element={<CheckIn />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/account" element={<Account />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          iconTheme: "",
          style: {
            padding: '12px 20px',
            fontSize: 18,
            ...darkModeToastStyles
          }
        }}
      />
    </QueryClientProvider>
  )
}

export default App;
