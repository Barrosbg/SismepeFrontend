import { Card, CardMedia, Typography } from '@mui/material';

export default function CardImageText(props) {
    return (
        <Card style={{position: "absolute", maxWidth: props.imageWidth, borderRadius: props.imageRadius}}>
            <CardMedia
                component="img"
                alt={props.alt}
                image={props.image}
                title={props.imageTitle}
                style={{height: "100%", width: "100%"}}
                >
            </CardMedia>
            <Typography
                gutterBottom
                variant="h6"
                component="h6"
                style={
                    {
                    position: "absolute",
                    top: props.textTop,
                    width: props.textWidth,
                    textAlign: props.textAlign,
                    color: props.textColor,
                    backgroundColor: "none"
                    }
                }  
                >
                    {props.text}
            </Typography>
        </Card>
    );
}