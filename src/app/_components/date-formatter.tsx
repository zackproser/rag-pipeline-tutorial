import { parseISO, format } from "date-fns";
import { enUS } from 'date-fns/locale';

interface DateFormatterProps {
  dateString: string;
}

export default function DateFormatter({ dateString }: DateFormatterProps) {
  if (!dateString) {
    return null;
  }

  try {
    const date = parseISO(dateString);
    
    return (
      <time dateTime={dateString}>
        {format(date, "LLLL d, yyyy", {
          locale: enUS
        })}
      </time>
    );
  } catch (error) {
    console.error('Invalid date string:', dateString);
    return <time dateTime={dateString}>{dateString}</time>;
  }
}
