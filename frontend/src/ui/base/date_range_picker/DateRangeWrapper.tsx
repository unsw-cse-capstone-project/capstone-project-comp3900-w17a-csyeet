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

export const DateRangeWrapper: React.FC<{
  onDateChange: (value: DateRange<Date>) => void;
  dateRange?: DateRange<Date>;
  style?: React.CSSProperties;
}> = ({ onDateChange, dateRange = [null, null] }, style) => {
  const [value, setValue] = React.useState<DateRange<Date>>(dateRange);

  const onChange = (range: DateRange<Date>) => {
    onDateChange(range);
    setValue(range);
  };

  return (
    <div style={style}>
      <div style={{ marginTop: "10px" }}>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <DateRangePicker
            disablePast
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
                        <CalendarTodayIcon />
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
                        <CalendarTodayIcon />
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
