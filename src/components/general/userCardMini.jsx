import { Box, Card, CardContent, CardMedia, Hidden, Typography, useMediaQuery } from "@mui/material";

export default function UserCardMini(props) {
  const upSm = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const upMd = useMediaQuery(theme => theme.breakpoints.up("md"));

  const width = upMd ? 500 : upSm ? 350 : 0;

  return (
    <Card raised elevation={2} style={{ borderRadius: "16px", display: "flex" }}>
      <CardMedia style={{ backgroundColor: props.color || "#fff", width: 100 }} image={props.image} />
      <CardContent>
        <Box display="flex" flexWrap>
          <Box minWidth={100} width={width} justifyContent="flex-start">
            <Typography variant="subtitle1">
              {props.mainInfo}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {props.secondaryInfo}
            </Typography>
          </Box>
          {
            props.rightInfo &&
            <Box flexShrink={0} justifyContent="flex-end" alignSelf="center" sx={{ display: 'inline-flex' }}>
              {props.rightInfo}
            </Box>
          }
        </Box>
      </CardContent>
    </Card>
  );
}