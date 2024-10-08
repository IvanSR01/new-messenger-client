import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import socketService from '@/services/socket-service/socket.service';


interface UseTypingProps {
  chatId: number;
  userId: number;
}

export const useTyping = ({ chatId, userId }: UseTypingProps) => {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendStartTyping = () => {
    socketService.emit('start-typing', { chatId, userId });
  };

  const sendStopTyping = () => {
    socketService.emit('stop-typing', { chatId, userId });
  };

  const debouncedStartTyping = debounce(sendStartTyping, 500);

  const handleTyping = () => {
    debouncedStartTyping();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendStopTyping();
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        sendStopTyping();
      }
    };
  }, []);

  return { handleTyping };
};
