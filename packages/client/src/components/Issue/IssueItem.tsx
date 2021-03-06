import React, { memo, FC } from "react";
import { Box, Typography, Link } from "@material-ui/core";
import { IssueFragmentFragment } from "../../generated/graphql";
import BaseBlockQuote from "../Base/BaseBlockQuote";
import UpdatedAt from "../Date/UpdatedAt";
import CreatedAt from "../Date/CreatedAt";
import BaseRouterLink from "../Base/BaseRouterLink";
import { useStatusColor } from "../../utils/hooks/useStatusColor";

type Props = {
    issue: IssueFragmentFragment;
};

const IssueItem: FC<Props> = ({ issue }) => {
    const { _id, title, description, closed, createdAt, updatedAt } = issue;

    const color = useStatusColor(closed);

    return (
        <BaseBlockQuote bgcolor={color}>
            <Link
                noWrap
                variant="h6"
                color="textPrimary"
                href="#!"
                component={BaseRouterLink}
                to={`/d/issue/${_id}`}
            >
                {title}
            </Link>
            <Typography variant="body2" gutterBottom>
                {description}
            </Typography>
            <Box display="flex" justifyContent="space-between">
                <CreatedAt date={createdAt} />
                <UpdatedAt date={updatedAt} />
            </Box>
        </BaseBlockQuote>
    );
};

export default memo(IssueItem);
