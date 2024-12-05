import { TextInput } from './TextInput';
import { Box, InputAdornment, type TextFieldProps } from '@mui/material';
/* eslint-disable react/jsx-no-duplicate-props */
import { type FC, memo, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = TextFieldProps & {
  name: string;
  label?: unknown;
  defaultValue?: string;
  icon?: unknown;
  hideError?: boolean;
  counter?: boolean;
  limit?: number;
};

const TextField: FC<Props> = ({ icon, name, defaultValue = '', limit, counter, hideError, label, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const startIcon = useMemo(() => {
    if (!icon) return;
    return <InputAdornment position="start">{icon}</InputAdornment>;
  }, [icon]);

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
        <Box sx={{ position: 'relative', pt: 0.1 }}>
          <TextInput
            {...field}
            InputProps={{ startAdornment: startIcon }}
            inputProps={{ maxLength: limit || Number.POSITIVE_INFINITY }}
            fullWidth
            variant="outlined"
            error={!!errors[name]}
            helperText={!hideError && errors[name] ? errors[name].message : ''}
            {...props}
          />
          {counter && (
            <Box
              sx={{
                position: 'absolute',
                bottom: -5,
                right: 5,
                color: '#AEB0C1',
                fontSize: 13,
                lineHeight: '24px',
              }}
            >
              {field.value.length}/{limit}
            </Box>
          )}
        </Box>
      )}
    />
  );
};

export default memo(TextField);
