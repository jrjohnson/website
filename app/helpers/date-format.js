import { DateTime } from 'luxon';
import { helper } from '@ember/component/helper';

export function dateFormat([ date ]) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE);
}

export default helper(dateFormat);
