import { Notify } from 'quasar';

export const showNotification = (
  message: string,
  color: string,
  position:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center' = 'top',
) => {
  Notify.create({
    message,
    color,
    position,
  });
};
