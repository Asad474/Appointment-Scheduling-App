const getDate = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dt = date.getDate().toString().padStart(2, '0');

    const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    }

    return {
        current_date: `${year}-${month}-${dt}`, 
        current_day: days[date.getDay()],
    };
};

export default getDate;