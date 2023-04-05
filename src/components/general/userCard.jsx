import { Avatar, Box, Card, CardContent,TextField, CardMedia, Icon, IconButton, Tooltip, Typography } from "@mui/material";

export default function UserCard(props) {
    return (
        <Card raised elevation={2} style={{ borderRadius: "16px" }}>
            <CardMedia style={{ textAlign: "center", backgroundColor: "#4F92FF", padding: 10 }}>
                <Avatar style={{ height: '123px', width: '123px', marginLeft: "auto", marginRight: "auto" }} src={props.avatar} variant="rounded" />
            </CardMedia>
            <CardContent>
                <Typography variant="h6" component="h4">
                    {props.mainInfo}
                </Typography>

                <div style={{ padding: 4 }}>
                    {
                        props.infos.map((info, i) => {
                            return (
                                <Tooltip title={info.label} placement="left">
                                    <Box display="flex" m={-0.5} alignItems="center">
                                        <Box mr={1}>{(typeof info.icon) === 'string' ? <Icon>{info.icon}</Icon> : info.icon}</Box>
                                        <Box><Typography variant="body2">{info.text}</Typography></Box>
                                        {info.funcEdit &&
                                            <Box>
                                                <Tooltip title="Editar">
                                                    <IconButton onClick={info.funcEdit} size="large"><Icon fontSize="small">edit</Icon></IconButton>
                                                </Tooltip>
                                            </Box>}
                                    </Box>
                                </Tooltip>
                            );
                        })
                    }
                </div>
                <div>
                    {props.actions}
                </div>
            </CardContent>
        </Card>
    );
}