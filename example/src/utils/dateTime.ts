import { parse, format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';

const SERVER_DATE_FORMAT = 'yyyy-MM-dd' as const;
export const DATE_FORMAT_KO = 'yyyy년 MM월 dd일' as const;
export const DATE_FORMAT_KO_LONG = 'yyyy년 MM월 dd일 (EEEEE)' as const;
export const DATE_FORMAT_SHORT = 'yyyy.MM.dd' as const;
const SERVER_TIME_FORMAT = 'HH:mm' as const;
export const HOUR_FORMAT = 'aa h시' as const;
export const TIME_FORMAT = 'aa h시 mm분' as const;

export const dateFormatter = (dateString: string, formatString?: string) => {
  return format(parse(dateString, SERVER_DATE_FORMAT, new Date()), formatString ?? DATE_FORMAT_KO, {
    locale: koLocale,
  });
};

export const timeFormatter = (timeString: string) => {
  const time = parse(timeString, SERVER_TIME_FORMAT, new Date());
  return format(time, time.getMinutes() > 0 ? TIME_FORMAT : HOUR_FORMAT, {
    locale: koLocale,
  });
};
