import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

const FormButton = ({ loading, children, fullWidth = true, ...props }) => {
    return (
        <FormControl margin="normal" fullWidth={fullWidth}>
            <Button
                type="submit"
                color="primary"
                variant="contained"
                {...props}
                startIcon={
                    loading && (
                        <Fade in={loading} unmountOnExit>
                            <CircularProgress size={22} thickness={4} />
                        </Fade>
                    )
                }
            >
                {children}
            </Button>
        </FormControl>
    );
};

export default memo(FormButton);