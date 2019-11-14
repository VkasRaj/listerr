import React, { FC, Fragment } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Column } from "../../generated/graphql";
import ColumnIssueList from "./ColumnIssueList";

type Props = {
    column: Column;
    index: number;
};

const ColumnItem: FC<Props> = ({ column, index }) => {
    return (
        <Draggable draggableId={column._id} index={index}>
            {(provided, { isDragging }) => {
                return (
                    <Fragment>
                        <Grid
                            item
                            xs
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Box
                                p={2}
                                bgcolor="#fff"
                                height="100%"
                                borderRadius="borderRadius"
                                boxShadow={isDragging ? 5 : 1}
                                border={isDragging ? 2 : 0}
                            >
                                <Typography variant="subtitle2" paragraph>
                                    {column.title}
                                </Typography>
                                <ColumnIssueList
                                    droppableId={column._id}
                                    issues={column.issues}
                                />
                            </Box>
                        </Grid>
                        {provided.placeholder}
                    </Fragment>
                );
            }}
        </Draggable>
    );
};

export default ColumnItem;