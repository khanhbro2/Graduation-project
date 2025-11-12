import React from 'react';
import toast, { Toast } from 'react-hot-toast';
import { Check, X } from 'tabler-icons-react';

class NotifyUtils {
  static simple = (message: React.ReactNode) => {
    toast(String(message), {
      duration: 5000,
    });
  };

  static simpleSuccess = (message: React.ReactNode) => {
    toast.success(String(message), {
      duration: 5000,
      icon: <Check size={18}/>,
    });
  };

  static simpleFailed = (message: React.ReactNode) => {
    toast.error(String(message), {
      duration: 5000,
      icon: <X size={18}/>,
    });
  };
}

export default NotifyUtils;
