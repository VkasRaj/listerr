import React, { Fragment } from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import BackIcon from "@material-ui/icons/ArrowBackTwoTone";

import IssueAddForm from "./issue.add.form";

const initialValues = { title: "", description: "" };

const styles = ({ spacing }) => ({
    headerMargin: {
        marginBottom: spacing.unit * 2
    }
});

const _Link = props => <Link to="/d/issues/list" {...props} />;

const IssueAdd = ({ classes }) => {
    const onSubmit = values => console.log(values);

    return (
        <Fragment>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.headerMargin}
            >
                <Grid item>
                    <IconButton color="primary" component={_Link}>
                        <BackIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h5">Add Issue</Typography>
                </Grid>
            </Grid>
            <IssueAddForm onSubmit={onSubmit} initialValues={initialValues} />
        </Fragment>
    );
};

export default withStyles(styles)(IssueAdd);