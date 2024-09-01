import { toast } from 'react-toastify';

/**
 * Configuration object for toast notifications.
 *
 * @property {string} position - The position of the toast on the screen (e.g., "top-center").
 * @property {number} autoClose - Duration in milliseconds before the toast automatically closes.
 * @property {boolean} hideProgressBar - Determines whether to hide the progress bar.
 * @property {boolean} closeOnClick - Allows the toast to be closed when clicked.
 * @property {boolean} pauseOnHover - Pauses the autoClose timer when the toast is hovered over.
 * @property {boolean} draggable - Allows the toast to be draggable.
 * @property {undefined} progress - Custom progress bar value (undefined for default behavior).
 */
const toastConfig = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * Displays a success toast notification with the given message.
 *
 * @param {string} message - The message to display in the success toast.
 */
export const showSuccessToast = (message) => {
  toast.success(message, toastConfig);
};

/**
 * Displays an error toast notification with the given message.
 *
 * @param {string} message - The message to display in the error toast.
 */
export const showErrorToast = (message) => {
  toast.error(message, toastConfig);
};