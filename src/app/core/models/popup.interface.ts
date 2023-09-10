export interface Popup {
    message: string;
    type: 'error' | 'success' | 'info';
    autoCloseable: boolean;
}