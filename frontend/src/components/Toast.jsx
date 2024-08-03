import { useEffect } from 'react';
import '../styles/Toast.css';

const Toast = ({ message, type }) => {
  useEffect(() => {
    const toastElement = document.querySelector('.toast');
    if (toastElement) {
      toastElement.classList.add('toast-show');
    }

    return () => {
      if (toastElement) {
        toastElement.classList.remove('toast-show');
      }
    };
  }, [message, type]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast;
