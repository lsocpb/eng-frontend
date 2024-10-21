import { io } from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
        this.auctionId = null;
    }

    connect(token) {
        if (this.socket) return;

        this.socket = io('https://ws.charfair.me', {
            extraHeaders: {
                Authorization: token
            }
        });

        this.socket.on('connect', () => {
            if (this.auctionId) {
                this.followAuction(this.auctionId);
            }
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        this.socket.on('bid_price_update', (data) => {
            this.notifyListeners('bid_price_update', data);
        });

        this.socket.on('bid_winner_update', (data) => {
            this.notifyListeners('bid_winner_update', data);
        });

    }

    followAuction(auctionId) {
        if (!this.socket) return;
        this.auctionId = auctionId;
        this.socket.emit('follow_auction', { auction_id: auctionId });
    }

    addListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);
    }

    removeListener(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }

    notifyListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => callback(data));
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();
