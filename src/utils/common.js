import { Header, Image, Segment, Card, Placeholder, Popup, Icon, Button } from "semantic-ui-react";
import CONFIG from "../config/config.js"
import Assets from '../assets/Assets'
import { getBrowserLocation } from "../helper/getDeviceLocation";

// return the user data from the session storage
export const getUser = () => {
    const userStr = JSON.parse(sessionStorage.getItem('LoggedUser'));
    // let userStr = JSON.parse(localStorage.getItem("LoggedUser"))
    if (userStr) return userStr;
    else return null;
}

// return the token from the session storage
export const getToken = () => {
    return JSON.parse(sessionStorage.getItem('authToken')) || null;
    // return JSON.parse(localStorage.getItem("LoggedUser")) || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('LoggedUser');
    window.localStorage.clear()
    window.location.href = "/"
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('authToken', JSON.stringify(token));
    sessionStorage.setItem('LoggedUser', JSON.stringify(user));
}

//to install app regarding device OS
export const installAppBtn = async () => {
    let obj = { ... await getBrowserLocation() }
    let _link = "https://play.google.com/store/apps/details?id=com.chat.pickzon"
    if (obj.OS === ('iPhone' || 'iPad')) {
        _link = "https://apps.apple.com/in/app/pickzon/id1560097730"
    }
    window.open(`${_link}`, '_blank');
}

export const openAppUrl = async () => {
    let obj = { ... await getBrowserLocation() }
    let _link = "https://play.google.com/store/apps/details?id=com.chat.pickzon"
    if (obj.OS === ('iPhone' || 'iPad')) {
        _link = "https://apps.apple.com/in/app/pickzon/id1560097730"
    }
    return window.location.href = _link;
};

//to export no-data image
export const NoData = ({ message }) => {
    return (
        <Segment basic style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Image src={Assets.defaultPlaceholders.noData.img} alt={Assets.defaultPlaceholders.noData.alt} centered size="large" style={{ marginTop: "10%" }} />
            <Header as="h1" textAlign="center" >
                {message ? message : "No Data Available"}
            </Header>
        </Segment>
    );
};

//to export coming-soon banner
export const ComingSoon = ({ message, imgSize }) => {
    return (
        <Segment basic style={{ margin: "5rem auto" }}>
            <Image src={Assets.defaultPlaceholders.comingSoon.img} alt={Assets.defaultPlaceholders.comingSoon.alt} centered size={imgSize ? imgSize : "large"} />
            <Header as="h1" textAlign="center" color="blue"  >
                {message ? message : "Coming Soon"}
            </Header>
        </Segment>
    )
}

//to export default profile image
export const makeUserProfileImgURL = (image) => {
    try {
        let userProfileComImg = "";
        if (image.search("https") >= 0) {
            userProfileComImg = image;
        } else {
            userProfileComImg = Assets.defaultPlaceholders.userProfile.img;
            // userProfileComImg = image;
            // userProfileComImg = userProfileComImg.split("./")[1];
            // userProfileComImg = CONFIG.imageURL + userProfileComImg;
        };
        return userProfileComImg;
    } catch (er) {
        return Assets.defaultPlaceholders.userProfile.img;
    };
};

//to export trimmed name/username
export const trimUserName = (name, trimLength) => {
    try {
        if (name) {
            let trimName = name;
            if (trimName.length <= trimLength) {
                return trimName;
            } else {
                trimName = trimName.substr(0, trimLength + 1) + "...";
                return trimName;
            }
        }
    } catch (er) {
        console.log(er);
    }
}

//to display Skeleton / skintone / placeholder for Feed-card
export const SkinTone = ({ index, listCount }) => {
    return (
        <>
            {Array(listCount).fill(
                <Card key={index} fluid>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line length=" short" />
                                <Placeholder.Line length="very short" />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                        <Placeholder style={{ maxWidth: "100%" }}>
                            <Placeholder.Image rectangular />
                            <Placeholder.Line length=" short" />
                        </Placeholder>
                    </Card.Content>
                </Card>
            ).map((item) => {
                return item
            })}
        </>
    )
}

//to export Not-Page-Found page
export const PageNotFound = ({ message, imgSize }) => {
    return (
        <Segment basic style={{ margin: "5rem auto" }}>
            <Image src={Assets.defaultPlaceholders.pageNotFound.img} alt={Assets.defaultPlaceholders.pageNotFound.alt} centered size={imgSize ? imgSize : "large"} />
            <Header as="h1" textAlign="center" >
                {message ? message : "Page Not Found"}
            </Header>
        </Segment>
    );
};

//to export List palceholder
export const ListPlaceholder = ({ listCount }) => {
    return (
        <>
            {Array(listCount).fill(
                <Segment style={{ margin: "0" }} basic>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                </Segment>
            ).map((item) => {
                return item
            })}
        </>
    )
}

export const MenuPlaceholder = ({ columnCount }) => {
    return (
        <Button.Group basic style={{ width: "100%", border: "none" }}>
            {Array(columnCount).fill(<Button>
                <Placeholder style={{ height: "50px", width: "50%", margin: "0 auto" }}>
                    <Placeholder.Image square />
                </Placeholder>
            </Button>).map(item => item)}
        </Button.Group>
    )
}

//to export html format
export const htmlData = (item) => {
    let data = item.replace(/\n/g, "<br/>")
    return <div dangerouslySetInnerHTML={{ __html: data }} />
}

export const openLink = (link) => {
    try {
        let search = link.search("http")
        if (search < 0) {
            link = "https://" + link
        };
        window.open(link, '_blank');
    } catch (er) { console.log(er); };
};

//copy to clipboard
export const copyTextBtn = (item) => {
    let data = item;
    return navigator.clipboard.writeText(data);
}