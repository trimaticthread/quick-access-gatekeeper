
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  deviceName: string;
  daysLeft: number;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  clearNotifications: () => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock data fetch - In a real app, this would be an API call
  useEffect(() => {
    // Mock calibration expiry notifications
    const mockNotifications = [
      {
        id: '1',
        message: 'Kalibrasyon süresi dolmak üzere!',
        deviceName: 'Dijital Multimetre',
        daysLeft: 5,
        timestamp: new Date(),
      },
      {
        id: '2',
        message: 'Kalibrasyon süresi dolmak üzere!',
        deviceName: 'Basınç Kalibratörü',
        daysLeft: 10,
        timestamp: new Date(),
      },
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.length);
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    clearNotifications,
    markAllAsRead,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
