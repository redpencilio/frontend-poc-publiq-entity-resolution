import { format as formatFn } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import { isBlank } from '@ember/utils';

export default function formatDate(date, options = {}) {
  let { format, showTime } = options;
  if (isBlank(format)) {
    format = 'dd-MM-yyyy';
    if (showTime) {
      format += ' HH:mm';
    }
  }
  if (date) {
    if (typeof date == 'string') {
      return formatFn(parseISO(date), format, options);
    } else {
      return formatFn(date, format, options);
    }
  } else {
    return null;
  }
}
