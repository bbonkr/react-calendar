export class DateUtil {
    /**
     * Date 형식을 확인합니다.
     *
     * @param {(Date | string | number)} value
     * @returns {Date}
     * @memberof Dates
     */
    public static ensureDateValue(value: Date | string | number): Date {
        let dateValue: Date;
        if (typeof value === 'string') {
            const numberValues = value
                .split(/[^0-9]/)
                .map((x) => parseInt(x, 10));
            if (numberValues.length >= 5) {
                dateValue = new Date(
                    numberValues[0],
                    numberValues[1] - 1,
                    numberValues[2],
                    numberValues[3],
                    numberValues[4],
                    numberValues[5],
                );
            } else {
                dateValue = new Date(value);
            }
        } else if (typeof value === 'number') {
            dateValue = new Date(value);
        } else {
            dateValue = value;
        }

        return dateValue;
    }
}
