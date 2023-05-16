import { Autocomplete, Box, TextField } from "@mui/material";
import { countries } from "./countries";

const CountryAutocomplete = ({ onChange, error, defaultLocation }) => {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{
                width: "222.4px"
            }}
            options={countries}
            autoHighlight
            getOptionLabel={option => option.label}
            defaultValue={countries.find(
                item => item.label === defaultLocation
            )}
            onChange={(event, data) => {
                onChange(data ? data.label : null);
            }}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt={`${option.label}`}
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Location"
                    error={Boolean(error)}
                    helperText={error && `${error?.message}`}
                />
            )}
        />
    );
};

export { CountryAutocomplete };
