import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import getDate from '../utils/getDate';

const Calendar = props => {
    const [events, setEvents] = useState('');
    
    useEffect(() => {
        if (props.data){
            const {current_date, current_day} = getDate(new Date());

            const availabilities = props.data.map(availability => {
                if (JSON.parse(availability.DaysOff).DaysOff.includes(current_day)){
                    return null;
                };

                return {
                    title: `${availability.User.name}\nTime: ${availability.start_time}-${availability.end_time}`,
                    date: current_date,
                }
            });

            const filtered_availabilities = availabilities.filter((item) => item !== null);
            setEvents(filtered_availabilities);
        }
    }, [props.data]);

    const eventContent = (arg) => {
        return (
          <div>
            <strong>{arg.event.title.split('\n')[0]}</strong>
            <br />
            {arg.event.title.split('\n')[1]}
          </div>
        );
    };
    
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventContent={eventContent} 
        />
    );
};

export default Calendar;