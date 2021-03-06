import React from "react";
import {
  DateRangePicker,
  DateRangeDelimiter,
  DateRange,
  LocalizationProvider,
} from "@material-ui/pickers";
import { TextField, InputAdornment } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import enAULocale from "date-fns/locale/en-AU";

/**
 * Component which wraps around Material-ui DateRangePicker
 * @param onDateChange
 * @param dateRange
 * @param style
 * @param className
 */
export const DateRangeWrapper: React.FC<{
  onDateChange: (value: DateRange<Date>) => void;
  dateRange?: DateRange<Date>;
  style?: React.CSSProperties;
  className?: string;
}> = ({ onDateChange, dateRange = [null, null], style, className }) => {
  const [value, setValue] = React.useState<DateRange<Date>>(dateRange);

  const onChange = (range: DateRange<Date>) => {
    onDateChange(range);
    setValue(range);
  };

  // Disable selecting the current date
  var minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  return (
    <div style={style} className={className}>
      <div style={{ marginTop: "10px" }}>
        <LocalizationProvider dateAdapter={DateFnsUtils} locale={enAULocale}>
          <DateRangePicker
            disablePast
            minDate={minDate}
            value={value}
            onChange={onChange}
            renderInput={(startProps: any, endProps: any) => (
              <React.Fragment>
                <TextField
                  {...startProps}
                  size="small"
                  helperText={undefined}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon style={{ color: "#7b7b7b" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <DateRangeDelimiter> to </DateRangeDelimiter>
                <TextField
                  {...endProps}
                  size="small"
                  helperText={undefined}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon style={{ color: "#7b7b7b" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
