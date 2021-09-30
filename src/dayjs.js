import dayjs from "dayjs";

const newDate = ( unix ) => {
    // take an input of unix seconds and return a date
    return dayjs(unix * 1000).format('MM/DD/YY @ HH:mm')}

export default newDate;