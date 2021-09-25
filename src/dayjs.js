import dayjs from "dayjs";

const newDate = ( unix ) => {
    // take an input of unix seconds and return a date
    let input = dayjs.unix(unix);
    let output = input.format()

    const day = output.slice(8,10)
    const month = output.slice(5,7)
    const year = output.slice(2,4)
    const time = output.slice(11,16)
    // result format: 10/8/21 @13 CST
    // day.format(): 2021-08-30T20:22:32-05:00

    return month + '/' + day + '/' + year + '  @' + time + ' CST'
}

export default newDate;