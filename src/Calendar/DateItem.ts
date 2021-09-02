import { DateType } from './DateType';

export interface DateItem {
    /** 날짜 */
    date: DateType;
    /** 날짜 출력 */
    text: string;
    /** 이전달 여부 */
    isPreviousMonth: boolean;
    /** 다음달 여부 */
    isNextMonth: boolean;
    /** 휴일여부 (일요일) */
    isHoliday: boolean;
    /** 오늘여부 */
    isToday: boolean;
    /** 선택여부 */
    isSelected: boolean;
    /** 선택여부 (시작) */
    isSelectedStart: boolean;
    /** 선택여부 (종료) */
    isSelectedEnd: boolean;
    /** 선택가능여부 */
    canSelect: boolean;
}
