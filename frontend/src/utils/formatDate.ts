import {format} from 'date-fns';

const formatDate = (date: Date): string =>
  format(date, 'dd/MM/yyyy HH:mm:ss')

export default formatDate;
