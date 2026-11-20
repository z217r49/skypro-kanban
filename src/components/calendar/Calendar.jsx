import { useMemo, useState } from "react";
import { formatDate } from "../../utils/task";
import {
    SCalendar,
    SCalendarTtl,
    SCalendarBlock,
    SCalendarNav,
    SCalendarMonth,
    SNavActions,
    SNavAction,
    SCalendarContent,
    SCalendarDaysNames,
    SCalendarDayName,
    SCalendarCells,
    SCalendarCell,
    SCalendarPeriod,
    SCalendarP,
} from "./Calendar.styled";

const MONTHS = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const DAY_NAMES = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const parseDate = (value) => {
    if (!value) {
        return null;
    }

    if (value instanceof Date) {
        return startOfDay(value);
    }

    const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Date(`${value}T00:00:00`)
        : new Date(value);

    return Number.isNaN(date.getTime()) ? null : startOfDay(date);
};

const isSameDay = (a, b) =>
    Boolean(a && b) &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

const Calendar = ({ value = "", onChange, disabled = false }) => {
    const selected = parseDate(value);
    const today = startOfDay(new Date());

    const [viewDate, setViewDate] = useState(() => selected ?? today);

    const cells = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const firstWeekDay = (new Date(year, month, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const result = [];

        for (let i = firstWeekDay - 1; i >= 0; i -= 1) {
            result.push({
                date: new Date(year, month - 1, daysInPrevMonth - i),
                otherMonth: true,
            });
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            result.push({ date: new Date(year, month, day), otherMonth: false });
        }

        let nextDay = 1;

        while (result.length % 7 !== 0 || result.length < 35) {
            result.push({ date: new Date(year, month + 1, nextDay), otherMonth: true });
            nextDay += 1;
        }

        return result;
    }, [viewDate]);

    const changeMonth = (delta) => {
        setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
    };

    const handleSelect = (date) => {
        if (disabled || !onChange) {
            return;
        }

        onChange(date);
    };

    return (
        <SCalendar>
            <SCalendarTtl>Даты</SCalendarTtl>
            <SCalendarBlock>
                <SCalendarNav>
                    <SCalendarMonth>
                        {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </SCalendarMonth>
                    <SNavActions>
                        <SNavAction onClick={() => changeMonth(-1)} title="Предыдущий месяц">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                            </svg>
                        </SNavAction>
                        <SNavAction onClick={() => changeMonth(1)} title="Следующий месяц">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                            </svg>
                        </SNavAction>
                    </SNavActions>
                </SCalendarNav>

                <SCalendarContent>
                    <SCalendarDaysNames>
                        {DAY_NAMES.map((name) => (
                            <SCalendarDayName key={name}>{name}</SCalendarDayName>
                        ))}
                    </SCalendarDaysNames>

                    <SCalendarCells>
                        {cells.map(({ date, otherMonth }) => (
                            <SCalendarCell
                                key={date.toISOString()}
                                $otherMonth={otherMonth}
                                $current={isSameDay(date, today)}
                                $active={isSameDay(date, selected)}
                                $disabled={disabled}
                                onClick={() => !otherMonth && handleSelect(date)}
                            >
                                {date.getDate()}
                            </SCalendarCell>
                        ))}
                    </SCalendarCells>
                </SCalendarContent>

                <SCalendarPeriod>
                    <SCalendarP>
                        Выберите срок исполнения{" "}
                        <span className="date-control">
                            {selected ? formatDate(selected) : ""}
                        </span>
                        .
                    </SCalendarP>
                </SCalendarPeriod>
            </SCalendarBlock>
        </SCalendar>
    );
};

export default Calendar;