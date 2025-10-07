import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socketInstance = null;

const useSocketConnection = () => {
    const [socket, setSocket] = useState(socketInstance);

    useEffect(() => {
        if (!socketInstance) {
            const token = localStorage.getItem("token");

            socketInstance = io("http://localhost:4000", {
                auth: { token },
            });

        }
        setSocket(socketInstance);

    }, []);

    return socket;
};

export const disconnectSocket = () => {
    if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
    }
};

export default useSocketConnection;