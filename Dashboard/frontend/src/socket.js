import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3002';
const socket = io(SOCKET_URL, { withCredentials: true });

let lastHoldings = [];
let lastWatchlist = [];
let lastOrders = [];
let lastIndices = null;

socket.on('holdings', (data) => {
  lastHoldings = data || [];
  window.dispatchEvent(new CustomEvent('holdings:update', { detail: lastHoldings }));
});

socket.on('watchlist', (data) => {
  lastWatchlist = data || [];
  window.dispatchEvent(new CustomEvent('watchlist:update', { detail: lastWatchlist }));
});

socket.on('orders', (data) => {
  lastOrders = data || [];
  window.dispatchEvent(new CustomEvent('orders:update', { detail: lastOrders }));
});

socket.on('indices', (data) => {
  lastIndices = data;
  window.dispatchEvent(new CustomEvent('indices:update', { detail: lastIndices }));
});

export function getLastHoldings() {
  return lastHoldings;
}

export function getLastWatchlist() {
  return lastWatchlist;
}

export function getLastOrders() {
  return lastOrders;
}

export function getLastIndices() {
  return lastIndices;
}

export function onSocket(event, cb) {
  socket.on(event, cb);
  return () => socket.off(event, cb);
}

export function emitSocket(event, payload, cb) {
  socket.emit(event, payload, cb);
}

export default socket;
