import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box } from './Box';
import { DateItem } from './DateItem';
import { DateType } from './DateType';
import { DateUtil } from './DateUtil';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);

interface ButtonContentProps {
    previousYear?: React.ReactNode;
    previousMonth?: React.ReactNode;
    nextMonth?: React.ReactNode;
    nextYear?: React.ReactNode;
}

interface CalendarProps {
    /**
     * 달력 기준일자; 입력된 값이 없으면 오늘을 기준으로 달력을 렌더링합니다.
     *
     * @type {DateType}
     * @memberof CalendarProps
     */
    selection?: DateType;
    /**
     * 선택된 날짜
     *
     * @type {DateType[]}
     * @memberof CalendarProps
     */
    selections?: DateType[];
    /**
     * 연단위 이동 사용
     *
     * @type {boolean}
     * @memberof CalendarProps
     */
    useMoveToYear?: boolean;
    /**
     * 월 단위 이동 사용
     *
     * @type {boolean}
     * @memberof CalendarProps
     */
    useMoveToMonth?: boolean;

    /**
     * 선택 가능 날짜 제한 (최소값)
     *
     * @type {DateType}
     * @memberof CalendarProps
     */
    minDate?: DateType;
    /**
     * 선택 가능 날짜 제한 (최대값)
     *
     * @type {DateType}
     * @memberof CalendarProps
     */
    maxDate?: DateType;

    /**
     * 날짜 출력
     *
     * @type {boolean}
     * @memberof CalendarProps
     */
    showDate?: boolean;
    /**
     * 오늘 하이라이트 여부
     *
     * @type {boolean}
     * @memberof CalendarProps
     */
    highlightToday?: boolean;

    /**
     * 날짜 형식
     *
     * Default: YYYY-MM-DD
     *
     * @type {string}
     * @memberof CalendarProps
     */
    dateFormat?: string;

    /**
     * Button contents
     *
     * @type {ButtonContentProps}
     * @memberof CalendarProps
     */
    buttonContentProps?: ButtonContentProps;

    /**
     * 선택 변경 처리기
     * - 처리기가 설정되지 않으면 사용자가 선택을 변경할 수 없습니다.
     *
     * @memberof CalendarProps
     */
    onChange?: (start: DateType | undefined, end: DateType | undefined) => void;
}

/**
 * 달력으로 기간을 선택합니다.
 * @param {CalendarProps}
 * @returns
 */
export const Calendar = ({
    selection,
    selections,
    useMoveToYear,
    useMoveToMonth,
    minDate,
    maxDate,
    showDate,
    highlightToday,
    dateFormat,
    buttonContentProps,
    onChange,
}: CalendarProps) => {
    const DATE_FORMAT = 'YYYY-MM-DD';

    const [date, setDate] = useState<DateType>(
        selection || dayjs().format(dateFormat ?? DATE_FORMAT),
    );
    const [selectedDates, setSelectedDates] = useState<DateType[]>(
        selections || [],
    );
    const [records, setRecords] = useState<DateItem[][]>([]);
    const today = dayjs();

    const updateRecords = useCallback(
        (
            basisDate: DateType,
            sDates: DateType[],
            minDate?: DateType,
            maxDate?: DateType,
        ) => {
            setRecords((_) => {
                const basis = dayjs(basisDate).startOf('month');
                const startWeek = basis.clone().startOf('month').week();
                const newRecords: DateItem[][] = [];
                // eslint-disable-next-line no-constant-condition
                for (let week = startWeek; true; week++) {
                    const items: DateItem[] = Array(7)
                        .fill(0)
                        .map<DateItem>((i, index) => {
                            const current = dayjs(basis)
                                .clone()
                                .week(week)
                                .startOf('week')
                                .add(i + index, 'day');

                            const item: DateItem = {
                                date: current.format(dateFormat ?? DATE_FORMAT),
                                text: current.date().toString(),
                                isHoliday: 0 === current.day(),
                                isPreviousMonth:
                                    current.month() !== basis.month() &&
                                    week === startWeek,
                                isNextMonth:
                                    current.month() !== basis.month() &&
                                    week !== startWeek,
                                isToday:
                                    current.format(
                                        dateFormat ?? DATE_FORMAT,
                                    ) ===
                                    dayjs().format(dateFormat ?? DATE_FORMAT),
                                isSelected:
                                    sDates &&
                                    sDates.length > 0 &&
                                    current.isBetween(
                                        dayjs(sDates[0]),
                                        dayjs(
                                            sDates.length === 1
                                                ? sDates[0]
                                                : sDates[1],
                                        ),
                                        'day',
                                        '[]',
                                    ),
                                isSelectedStart:
                                    sDates &&
                                    sDates.length > 0 &&
                                    current.format(
                                        dateFormat ?? DATE_FORMAT,
                                    ) ===
                                        dayjs(sDates[0]).format(
                                            dateFormat ?? DATE_FORMAT,
                                        ),
                                isSelectedEnd:
                                    sDates &&
                                    sDates.length > 0 &&
                                    current.format(
                                        dateFormat ?? DATE_FORMAT,
                                    ) ===
                                        dayjs(
                                            sDates.length === 1
                                                ? sDates[0]
                                                : sDates[1],
                                        ).format(dateFormat ?? DATE_FORMAT),
                                canSelect:
                                    !minDate && !maxDate
                                        ? true
                                        : current.isBetween(
                                              minDate ? minDate : '0001-01-01',
                                              maxDate ? maxDate : '9999-12-31',
                                              undefined,
                                              '[]',
                                          ),
                            };

                            return item;
                        });

                    newRecords.push(items);
                    if (basis.month() !== dayjs(items[6].date).month()) {
                        break;
                    }
                }

                return [...newRecords];
            });
        },
        [],
    );

    const getButtonTitle = (
        date: DateType,
        value: number,
        interval: 'year' | 'month',
    ): string => {
        const d = dayjs(DateUtil.ensureDateValue(date)).add(value, interval);

        return `Move to ${d.format('YYYY-MM')}`;
    };

    const handleClickPrevYear = () => {
        setDate((prevState) =>
            dayjs(prevState)
                .add(-1, 'year')
                .format(dateFormat ?? DATE_FORMAT),
        );
    };

    const handleClickPrevMonth = () => {
        setDate((prevState) =>
            dayjs(prevState)
                .add(-1, 'month')
                .format(dateFormat ?? DATE_FORMAT),
        );
    };
    const handleClickNextMonth = () => {
        setDate((prevState) =>
            dayjs(prevState)
                .add(1, 'month')
                .format(dateFormat ?? DATE_FORMAT),
        );
    };
    const handleClickNextYear = () => {
        setDate((prevState) =>
            dayjs(prevState)
                .add(1, 'year')
                .format(dateFormat ?? DATE_FORMAT),
        );
    };

    const handleClickToday = () => {
        setDate(
            today
                // .toDate()
                .format(dateFormat ?? DATE_FORMAT),
        );
    };

    const handleClickBox = (date: DateType) => {
        setSelectedDates((prevState) => {
            if (prevState.length === 1) {
                // prevState.push(date);
                // return [...prevState.sort((a, b) => (a > b ? 1 : -1))];
                return [...prevState, date].sort((a, b) => (a > b ? 1 : -1));
            } else {
                return [date];
            }
        });
    };

    useEffect(() => {
        updateRecords(date, selectedDates, minDate, maxDate);
    }, [date, selections, selectedDates, selection, minDate, maxDate]);

    useEffect(() => {
        if (onChange) {
            let start: DateType | undefined;
            let end: DateType | undefined;

            if (selectedDates.length === 0) {
                start = undefined;
                end = undefined;
            } else if (selectedDates.length === 1) {
                start = selectedDates[0];
                // end = selectedDates[0];
            } else {
                start = selectedDates[0];
                end = selectedDates[1];
            }

            onChange(start, end);
        }
    }, [onChange, selectedDates]);

    return (
        <div className="calendar-container">
            <div className="calendar-title">
                {useMoveToYear && (
                    <button
                        className="calendar-button previous-year"
                        onClick={handleClickPrevYear}
                        title={getButtonTitle(date, -1, 'year')}
                    >
                        {buttonContentProps?.previousYear}
                    </button>
                )}
                {useMoveToMonth && (
                    <button
                        className="calendar-button previous-month"
                        onClick={handleClickPrevMonth}
                        title={getButtonTitle(date, -1, 'month')}
                    >
                        {buttonContentProps?.previousMonth}
                    </button>
                )}
                <div>{dayjs(date).format('YYYY년 M월')}</div>
                {useMoveToMonth && (
                    <button
                        className="calendar-button next-month"
                        onClick={handleClickNextMonth}
                        title={getButtonTitle(date, 1, 'month')}
                    >
                        {buttonContentProps?.nextMonth}
                    </button>
                )}
                {useMoveToYear && (
                    <button
                        className="calendar-button next-year"
                        onClick={handleClickNextYear}
                        title={getButtonTitle(date, 1, 'year')}
                    >
                        {buttonContentProps?.nextYear}
                    </button>
                )}
            </div>
            <div className="calendar-week-container">
                {dayjs.weekdaysMin(true).map((item, index) => {
                    const weekdayNames = [
                        '일',
                        '월',
                        '화',
                        '수',
                        '목',
                        '금',
                        '토',
                    ];
                    const text = weekdayNames[index];
                    return (
                        <Box
                            key={item}
                            text={text}
                            canSelect={true}
                            isHoliday={index === 0}
                        />
                    );
                })}
            </div>
            {records.map((a, index) => (
                <div
                    key={(+new Date() + index).toString()}
                    className="calendar-week-container"
                >
                    {a.map((b) => (
                        <Box
                            key={`${b.date}`}
                            {...b}
                            highlightToday={highlightToday}
                            onClick={handleClickBox}
                        />
                    ))}
                </div>
            ))}
            {showDate && (
                <div className="calendar-bottom-container">
                    <button onClick={handleClickToday}>
                        Today: {today.format(dateFormat ?? DATE_FORMAT)}
                    </button>
                </div>
            )}
        </div>
    );
};
export default Calendar;
