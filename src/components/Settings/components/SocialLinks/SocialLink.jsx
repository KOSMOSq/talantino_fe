import { TextField } from "@mui/material";

const SocialLink = ({ register, errors, num }) => {
    return (
        <TextField
            label="Social link"
            {...register(`links.${num}`, {
                maxLength: {
                    value: 100,
                    message: "Too long link"
                }
            })}
            error={Boolean(errors.links?.[num])}
            helperText={errors.links?.[num] ? errors.links?.[num].message : " "}
        />
    );
};

export { SocialLink };
