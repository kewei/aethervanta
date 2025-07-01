import { ToastContainer } from 'react-toastify';

export default function App({ children }) { 

  return (
    <div className="antialiased">
      <ToastContainer position="top-center" autoClose={5000} />
      {children}
    </div>
  );
}
