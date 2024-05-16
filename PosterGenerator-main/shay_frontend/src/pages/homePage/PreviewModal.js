import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { componentKey } from "../homePage/HomePageSlice";
import HomePageStyle from "../../assets/css/homePageStyle/HomePageStyle";

const PreviewModal = ({ row }) => {
    const dispatch = useDispatch();
    const classes = HomePageStyle();
    const [dynamicHtml, setDynamicHtml] = useState(row?.userTemplate);
    const { openPreviewModal } = useSelector((state) => state[componentKey]);

    return (
        <Typography component="div" className={classes.posterContent}>
            <Typography component="div" className={classes.previewImageContainer}>
                <div
                    id="posterTemplate"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}
                    dangerouslySetInnerHTML={{ __html: dynamicHtml }}
                />
            </Typography>
        </Typography>
    );
};

export default PreviewModal;
