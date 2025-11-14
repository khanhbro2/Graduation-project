import React from 'react';
import toast from 'react-hot-toast';
import { Check, X, AlertCircle, InfoCircle } from 'tabler-icons-react';

type ToastMessage = string | React.ReactNode;

class NotifyUtils {
  static simple = (message: ToastMessage) => {
    toast(message as string | React.ReactElement, {
      duration: 3000,
      style: {
        background: '#3b82f6',
        color: '#fff',
      },
      iconTheme: {
        primary: '#3b82f6',
        secondary: '#fff',
      },
    });
  };

  static simpleSuccess = (message: ToastMessage) => {
    toast.success(message as string | React.ReactElement, {
      duration: 3000,
      icon: <Check size={18}/>,
      style: {
        background: '#10b981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    });
  };

  static simpleFailed = (message: ToastMessage) => {
    toast.error(message as string | React.ReactElement, {
      duration: 3000,
      icon: <X size={18}/>,
      style: {
        background: '#ef4444',
        color: '#fff',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    });
  };

  static simpleWarning = (message: ToastMessage) => {
    toast(message as string | React.ReactElement, {
      duration: 3000,
      icon: <AlertCircle size={18}/>,
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
      iconTheme: {
        primary: '#f59e0b',
        secondary: '#fff',
      },
    });
  };

  static simpleInfo = (message: ToastMessage) => {
    toast(message as string | React.ReactElement, {
      duration: 3000,
      icon: <InfoCircle size={18}/>,
      style: {
        background: '#3b82f6',
        color: '#fff',
      },
      iconTheme: {
        primary: '#3b82f6',
        secondary: '#fff',
      },
    });
  };
}

export default NotifyUtils;
