import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Container, Segment, Placeholder, Divider, Feed, Header, Image, Icon, Grid, Button, Card, Sticky } from "semantic-ui-react";
import { GET } from "../../../../../Services";
import { BLOG } from "../../../../../route/apiPath";
import { makeUserProfileImgURL, trimUserName } from "../../../../../utils/common";
import moment from "moment";
import NavigationPaths from "../../../../../route/navigationPath";
import Assets from '../../../../../assets/Assets'
import './style.css'
import { Helmet } from "react-helmet";
import { HomeMeta } from "../../../../../utils/meta";

const BlogDetails = () => {
    let location = useLocation();
    let userId = location.pathname.split("/")[2];
    const [loader, setLoader] = useState("")
    const [showBlogsDetials, setShowBlogsDetials] = useState({});
    const [sliderData, setSliderData] = useState([])
    const router = useHistory();

    useEffect(() => {
        router.listen((result) => {
            try {
                userId = result.pathname.split("/")[2]
                setShowBlogsDetials({});
                fetchBlogDetails();
            } catch (er) { console.log(er); };
        });
        fetchBlogDetails();
        fetchLatestBlog();
    }, []);


    const fetchBlogDetails = async () => {
        try {
            // debugger
            let { status, message, payload } = await GET(BLOG.FETCH_DETAILS, { slug: userId });
            if (status === 0) {
                return console.error(message);
            }
            setLoader(status);
            setShowBlogsDetials(payload);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchLatestBlog = async () => {
        try {
            let { status, message, payload } = await GET(BLOG.FETCH_LATEST, {});
            if (status === 0) {
                return console.error(message);
            }
            setSliderData(payload);
        } catch (err) {
            console.log(err)
        }
    }

    const onHandleRead = (item) => {
        router.push({
            pathname: '/blog/' + item.slug,
            // state: item._id
        })
    }

    const sliderCards = sliderData.filter((item) => {
        return item.slug !== userId
    }).map((item, i) => {
        return (
            <Card key={i} style={{ width: "300px", height: "300px", color: "white", marginBottom: "3rem", borderRadius: "20px", overflow: "hidden" }} onClick={() => onHandleRead(item)}>
                <Image src={item.img?.thumbnail} alt={item.img?.alt} style={{ height: "100%" }} />
                <Card.Content style={{ position: "absolute", bottom: "0", border: "0", width: "100%", backgroundColor: "rgba(43, 43, 43, 0.6) " }}>
                    <Grid>
                        <Grid.Row style={{ height: "140px" }}>
                            <Grid.Column width={10} className="tabwfull">
                                <Card.Description as="p" style={{ margin: "0" }}>
                                    {moment(item.createdAt).utc().format('YYYY-MM-DD')}
                                </Card.Description>
                                <Card.Header as="h3" className="blog-grid-desc">
                                    {item.title}
                                </Card.Header>
                            </Grid.Column>
                            <Grid.Column width={6} textAlign="center" style={{ borderLeft: "1px solid " }} className="tabwfull_2">
                                <Card.Description textAlign="left" as="p" style={{ display: "flex", flexDirection: "column" }}>
                                    By
                                    <b>
                                        {trimUserName(item.postedBy.name, 10) ?? "Pickzon"}
                                    </b>
                                </Card.Description>
                                <Card.Header as="h3">
                                    <Icon name="play circle" size="big" onClick={() => onHandleRead(item)} style={{ cursor: "pointer" }} />
                                </Card.Header>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card >
        )
    })

    return (
        <>
            <Helmet>
                <title>{showBlogsDetials.title ?? HomeMeta.title}</title>
                <link rel="canonical" href={window.location.href} />
                <meta property="og:image" content={showBlogsDetials.img?.thumbnail ?? "https://d3t5gz5ttp8loj.cloudfront.net/common_images/pickzon_logo.png"} />
                <meta name="description" content={showBlogsDetials?.desc ?? HomeMeta.description} />
                <meta name="keywords" content={HomeMeta.keywords} />
            </Helmet>
            {loader === 0 ?
                <Segment padded style={{ margin: "50px 200px" }}>
                    <Placeholder fluid>
                        <Placeholder>
                            <Placeholder.Image rectangular />
                        </Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                    <Placeholder fluid>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
                :
                <Container fluid >
                    <Grid stackable columns={2} style={{ margin: "0 35px" }}>
                        <Grid.Column width={12}>
                            <Segment style={{ borderRadius: "25px" }}>
                                <Segment basic style={{ margin: "0", display: "flex" }}>
                                    <Button circular icon='arrow left' as={Link} to={NavigationPaths.BLOGS} style={{ margin: "0.5rem 1rem auto 0" }} />
                                    <h1 className="detail-page-title">
                                        {showBlogsDetials.title}
                                    </h1>
                                </Segment>
                                <Segment basic style={{ margin: "0" }}>
                                    <Image src={showBlogsDetials.img?.background ?? Assets.defaultPlaceholders.landscape.img} centered style={{ borderRadius: "20px" }} />
                                </Segment>
                                <Segment basic style={{ borderRadius: "25px" }}>
                                    <Container textAlign="justified" fluid>
                                        <Feed>
                                            <Feed.Event>
                                                <Feed.Label image={makeUserProfileImgURL(showBlogsDetials.postedBy?.profileImage) ?? Assets.defaultPlaceholders.userProfile.img} alt={showBlogsDetials.postedBy?.name} />
                                                <Feed.Content style={{ display: "flex" }}>
                                                    <Feed.Date>{showBlogsDetials.date}</Feed.Date>
                                                    <Feed.Summary>
                                                        By: {showBlogsDetials.postedBy?.name ?? "Pickzon"}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                        <Divider fitted />
                                        <Header as="h1">
                                            {showBlogsDetials.title}
                                        </Header>
                                        <div dangerouslySetInnerHTML={{ __html: showBlogsDetials.body }} style={{ fontSize: "20px" }} />
                                    </Container>
                                </Segment>
                            </Segment>

                        </Grid.Column>
                        <Grid.Column width={4} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Segment basic style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0", position: "sticky", top: "5.5em" }}>
                                {sliderCards}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
            }
        </>
    )
};

export default React.memo(BlogDetails);
