import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton, Snackbar, TextField, Tooltip, Typography, Alert } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    componentKey,
    setImageBottomText,
    setImageCaptions,
    setUploadImage,
    setUpdatePostData,
    setTemplatesListData,
    setSnackbarMessage,
} from "../homePage/HomePageSlice";
import HomePageStyle from "../../assets/css/homePageStyle/HomePageStyle";
import SaveIcon from "@material-ui/icons/Save";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import html2canvas from "html2canvas";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { TwitterPicker } from "react-color";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import TuneIcon from "@material-ui/icons/Tune";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import CachedIcon from "@material-ui/icons/Cached";
import { getAuthToken, getTemplatesList, shareTemplateData, storeTemplateData } from "../homePage/HomePageSaga";
import General from "../../utils/General";
import TransparentLoader from "../../components/LoaderComponent";

const PostarModalContent = ({ handleClose }) => {
    const dispatch = useDispatch();
    const classes = HomePageStyle();
    const initialImageDataRef = useRef(null);
    const elementRef = useRef(null);
    const fileName = "poster-image.png";

    const [rotation, setRotation] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [initialHtmlTemplate, setInitialHtmlTemplate] = useState();
    const [dataUrl, setDataUrl] = useState();
    const [dynamicHtml, setDynamicHtml] = useState();

    const {
        imageCaptions,
        imageBottomText,
        uploadedImage,
        updatePostData,
        templatesListData,
        isLoading,
        snackbarMessage,
    } = useSelector((state) => state[componentKey]);

    const handleUploadFile = (event) => {
        const file = event.target.files[0];

        dispatch(setUploadImage(file));
    };

    useEffect(() => {
        setDynamicHtml(templatesListData?.template);
        setInitialHtmlTemplate(templatesListData?.template);
    }, [templatesListData]);

    const handleUpdateClick = () => {
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                setDynamicHtml((prevHtml) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(prevHtml, "text/html");

                    if (imageCaptions) {
                        const posterTitle = doc.getElementById("subheading");
                        if (posterTitle) {
                            posterTitle.textContent = imageCaptions;
                        }
                    }
                    if (imageBottomText) {
                        const subheading = doc.getElementById("criminalName");

                        if (subheading) {
                            subheading.textContent = imageBottomText;
                        }
                    }
                    if (imageDataUrl) {
                        const mugshot = doc.querySelector(".mugshot");
                        if (mugshot) {
                            mugshot.style.backgroundImage = `url(${imageDataUrl})`;
                        }
                    }

                    return doc.documentElement.outerHTML;
                });
            };

            reader.readAsDataURL(uploadedImage);
        } else {
            dispatch(setSnackbarMessage("Please upload an image."));
        }

        initialImageDataRef.current = {
            imageCaptions,
            imageBottomText,
            uploadedImage,
            rotation,
            zoomLevel,
            brightness,
            contrast,
        };
    };

    const handleShareClick = () => {
        const baseImageURL = General.toPngImageConvertor(elementRef.current, fileName);
        baseImageURL
            .then((dataUrl) => {
                setDataUrl(dataUrl);
            })
            .catch((err) => {
                console.error("Error:", err);
            });

    };

    const handleSaveClick = () => {
        dispatch(
            storeTemplateData({
                userTemplate: dynamicHtml,
                user: "Harry User",
                posterName: "Wanted Poster",
            })
        );

        const baseImageURL = General.toPngImageConvertor(elementRef.current, fileName);
        baseImageURL.then((dataUrl) => {
            General.downloadFile(dataUrl, fileName);
        });
    };

    const handleRotate = () => {
        setRotation((prevRotation) => prevRotation + 90);
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 10));
    };

    const handleRefresh = () => {
        setDynamicHtml(initialHtmlTemplate);
        const initialData = initialImageDataRef.current;
        if (initialData) {
            dispatch(setImageCaptions(initialData.imageCaptions));
            dispatch(setImageBottomText(initialData.imageBottomText));
            setRotation(initialData.rotation);
            setZoomLevel(initialData.zoomLevel);
            setBrightness(100);
            setContrast(100);
        } else {
            dispatch(setSnackbarMessage("No initial data available."));
        }
    };

    const handleBrightnessChange = (value) => {
        setBrightness(value);
    };

    const handleContrastChange = (value) => {
        setContrast(value);
    };

    useEffect(() => {
        if (dataUrl) {
            dispatch(
                shareTemplateData({
                    imagebase64: dataUrl.split(",")[1],
                })
            );
        }
    }, [dataUrl]);

    useEffect(() => {
        const templateId = "posterTemplate";
        General.applyFilters(templateId, brightness, contrast);
    }, [brightness, contrast]);

    useEffect(() => {
        const data = {
            id: "65a90367b914fe51ccbf796b",
        };
        dispatch(getTemplatesList({ data }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(setImageBottomText(""));
        dispatch(setImageCaptions(""));
        setDynamicHtml((prevHtml) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(prevHtml, "text/html");

            const posterTitle = doc.getElementById("subheading");
            if (posterTitle) {
                posterTitle.textContent = "Dead or Alive";
            }

            const subheading = doc.querySelector(".criminalName");
            if (subheading) {
                subheading.textContent = "Type Here";
            }

            return doc.documentElement.outerHTML;
        });
    }, []);

    useEffect(() => {
        setDynamicHtml((prevHtml) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(prevHtml, "text/html");
            if (imageCaptions || imageCaptions == "") {
                const posterTitle = doc.getElementById("subheading");
                if (posterTitle) {
                    posterTitle.textContent = imageCaptions || "Dead or Alive";
                }
            }
            if (imageBottomText || imageBottomText == "") {
                const subheading = doc.querySelector("#criminalName");
                if (subheading) {
                    subheading.textContent = imageBottomText || "Type here";
                }
            }
            return doc.documentElement.outerHTML;
        });
        initialImageDataRef.current = {
            imageCaptions,
            imageBottomText,
            uploadedImage,
            rotation,
            zoomLevel,
            brightness,
            contrast,
        };
    }, [imageCaptions, imageBottomText]);

    return (
        <Typography component="div" className={classes.posterContent}>
            <div className={classes.iconContainer}>
                <Tooltip title="Refresh">
                    <IconButton onClick={handleRefresh}>
                        <CachedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Adjust Brightness">
                    <IconButton onClick={() => handleBrightnessChange(brightness - 10)}>
                        <Brightness4Icon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Adjust Contrast">
                    <IconButton onClick={() => handleContrastChange(contrast - 10)}>
                        <TuneIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Rotate">
                    <IconButton onClick={handleRotate}>
                        <RotateLeftIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Zoom Out">
                    <IconButton onClick={handleZoomOut}>
                        <ZoomOutIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <Typography component="div" className={classes.templateContainer}>
                <Typography component="div" className={classes.containerWrapper}>
                    <Typography component="div" className={classes.container}>
                        <TextField
                            label="First Input"
                            value={imageCaptions}
                            onChange={(e) => dispatch(setImageCaptions(e.target.value))}
                            size="small"
                        />
                        <TextField
                            label="Second Input"
                            value={imageBottomText}
                            onChange={(e) => dispatch(setImageBottomText(e.target.value))}
                            size="small"
                        />
                        <input type="file" onChange={handleUploadFile} accept="image/*" />
                        <Button
                            className={classes.button}
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleUpdateClick}
                        >
                            Update
                        </Button>
                    </Typography>

                    <Typography component="div" className={classes.buttonContainer}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<LinkedInIcon />}
                            onClick={handleShareClick}
                        >
                            Share
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveClick}
                        >
                            Save
                        </Button>
                    </Typography>
                </Typography>

                <Typography component="div" className={classes.imageContainer}>
                    <div
                        ref={elementRef}
                        id="posterTemplate"
                        style={{
                            transform: `rotate(${rotation}deg) scale(${zoomLevel / 100})`,
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                        dangerouslySetInnerHTML={{ __html: dynamicHtml }}
                    />
                </Typography>
            </Typography>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarMessage?.length ? true : false}
                autoHideDuration={2000}
                onClose={() => dispatch(setSnackbarMessage(""))}
                message={snackbarMessage}
            />
            {isLoading && <TransparentLoader />}
        </Typography>
    );
};

export default PostarModalContent;
