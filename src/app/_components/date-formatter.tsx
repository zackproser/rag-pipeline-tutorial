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
    
    // Use explicit locale and UTC timezone to ensure consistent server/client rendering
    return (
      <time dateTime={dateString}>
        {format(date, "LLLL d, yyyy", {
          locale: enUS,
          timeZone: 'UTC'
        })}
      </time>
    );
  } catch (error) {
    // Log error but don't expose to user
    console.error('Invalid date string:', dateString);
    // Return ISO date string as fallback
    return <time dateTime={dateString}>{dateString}</time>;
  }
}
