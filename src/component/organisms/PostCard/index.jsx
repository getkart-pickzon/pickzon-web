import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import LanguageIcon from '@mui/icons-material/Language';
import FollowButton from '../../molecules/FollowButton/index';
import { Box } from '@mui/material';

const PostCard = () => {

    return (
        <Card sx={Style.postCard}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], height: "70px", width: "70px" }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <>
                        <FollowButton />
                        <IconButton aria-label="settings">
                            <BookmarkBorderRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </>
                }
                title={
                    <Typography variant='h5' sx={{ fontWeight: "600" }}>
                        Victoria Ellie
                    </Typography>
                }
                subheader={
                    <>
                        <Typography sx={{ color: 'primary.400' }}>
                            Social Media Manager @Google | Me...
                        </Typography>
                        <Typography sx={{ color: 'primary.400', display: "flex", alignItems: "center" }}>
                            5h ago&nbsp;<LanguageIcon sx={{ fontSize: "1rem" }} />
                        </Typography>
                    </>
                }
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <Box SX={{ p: "0 1rem" }}>
                <Box sx={Style.mediaWrapper}>
                    <img src={"https://d3t5gz5ttp8loj.cloudfront.net/web-pages/login/in/pickzon_QR.png"} alt="" sx={Style.mediaContent} />
                </Box>
            </Box>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions>
        </Card>
    );
}
export default PostCard;

const Style = {
    postCard: {
        borderRadius: "1rem",
        maxWidth: "auto",
        // maxHeight: 800,
        boxShadow: "none"
    },
    mediaWrapper: {
        borderRadius: "0.8rem",
        margin: "0 1rem",
        height: "600px", //container height
        width: "auto",
        overflow: "hidden",
        backgroundColor: "black",
        display: "flex",
        alignitems: "center",
        justifyContent: "center",
    },
    mediaContent: {
        height: "100%",
        width: "auto",
        objectFit: "contain",
        display: "flex",
        justifyContent: "center",
        // backgroundColor: "black",
        alignItems: "center",
    }

}