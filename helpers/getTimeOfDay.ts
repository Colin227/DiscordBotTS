import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

const getTimeOfDay = (currentTime: Dayjs): string => {
    if (!currentTime || !currentTime.isValid()) { return 'day'; }

    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening
    const currentHour = parseFloat(currentTime.format('HH'));

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
        // Between 12 PM and 5PM
        return 'afternoon';
    } else if (currentHour >= splitEvening) {
        // Between 5PM and Midnight
        return 'evening';
    }
    // Between dawn and noon
    return 'morning';
}

export default getTimeOfDay;