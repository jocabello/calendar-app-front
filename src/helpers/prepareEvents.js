// import moment from "moment";


export const prepareEvents = (events = []) => {

    return events.map(
        (e) => ({
            ...e,
            // end: moment(e.end).toDate,
            // start: moment(e.start).toDate
            start: new Date(e.start),
            end: new Date(e.end)
        })
    )

}