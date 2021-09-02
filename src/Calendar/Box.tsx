import React from 'react';
import { DateType } from './DateType';

interface BoxProp {
    /** 날짜 */
    date?: DateType;
    /** 출력 문자열 */
    text?: string | number;
    /** 휴일여부 */
    isHoliday?: boolean;
    /** 이전달 여부 */
    isPreviousMonth?: boolean;
    /** 다음달 여부 */
    isNextMonth?: boolean;
    /** 오늘 여부 */
    isToday?: boolean;
    /** 선택여부 */
    isSelected?: boolean;
    /** 선택 시작 여부 */
    isSelectedStart?: boolean;
    /** 선택 종료 여부 */
    isSelectedEnd?: boolean;
    /** 선택가능여부 */
    canSelect: boolean;
    /** 오늘 하이라이트 여부 */
    highlightToday?: boolean;
    /** 날짜 클릭 처리기 */
    onClick?: (date: DateType) => void;
}

export const Box = ({
    date,
    text,
    isHoliday,
    isPreviousMonth,
    isNextMonth,
    isToday,
    isSelected,
    isSelectedStart,
    isSelectedEnd,
    canSelect,
    highlightToday,
    onClick,
}: BoxProp) => {
    return (
        <div
            className={`calendar-box ${isHoliday ? 'calendar-holiday' : ''} ${
                isPreviousMonth ? 'calendar-previous-month' : ''
            } ${isNextMonth ? 'calendar-next-month' : ''}`}
            onClick={() =>
                onClick && date && canSelect ? onClick(date) : undefined
            }
        >
            <div
                className={`calendar-selectionBox ${
                    isSelected ? 'calendar-selectionBox-selected' : ''
                } ${
                    isSelectedStart
                        ? 'calendar-selectionBox-selected-start'
                        : ''
                } ${
                    isSelectedEnd ? 'calendar-selectionBox-selected-end' : ''
                } ${canSelect ? '' : 'calendar-box-disabled'}`}
            >
                <div
                    className={`${
                        isToday && highlightToday ? 'calendar-today' : ''
                    }`}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};
