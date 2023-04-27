// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Divider, Icon, Card, Grid, Image, Container, Placeholder, Segment } from "semantic-ui-react";
// import { useHistory } from "react-router";
// import { GET } from "../../../../Services";
// import NavigationPaths from "../../../../route/navigationPath";
// import moment from "moment";
// import Assets from "../../../../assets/Assets";

// import "./style.css";

// const BlogPage = () => {
//     let router = useHistory();
//     const [state, setState] = useState([]);
//     const [loader, setLoader] = useState("");
//     const [resetBlur, setResetBlur] = useState("");
//     const [blurBg, setBlurBg] = useState(false);
//     const [header, setHeader] = useState({
//         background: "",
//         date: "",
//         heading: "",
//         description: "",
//         bool: false,
//         _id: ""
//     });
//     useEffect(() => {
//         setBlurBg(false)
//     }, [resetBlur])

//     useEffect(() => {
//         fetchLatestBlog()
//     }, [])

//     const fetchLatestBlog = async () => {
//         try {
//             let { status, message, payload } = await GET('/blog/fetch-latest-blogs', {});
//             if (status === 0) {
//                 return console.error(message);
//             }
//             setHeader((prev) => ({
//                 ...prev,
//                 background: payload[0].img.background,
//                 heading: payload[0].title,
//                 description: payload[0].desc,
//                 date: payload[0].createdAt,
//                 slug: payload[0].slug,
//                 _id: payload[0]._id
//             }))
//             setLoader(status);
//             setState(payload);
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const onHandleHover = (item) => {
//         setResetBlur(!resetBlur)
//         setTimeout(() => {
//             setHeader((prev) => ({
//                 ...prev,
//                 background: item.img.background,
//                 heading: item.title,
//                 description: item.desc,
//                 date: item.createdAt,
//                 slug: item.slug,
//                 _id: item._id
//             }))
//             setBlurBg(true)
//         }, 100);
//     }

//     const onHandleRead = (item) => {
//         router.push({
//             pathname: '/blog/' + item.slug,
//             state: item._id
//         })
//     }

//     return (
//         <>
//             {loader === 0 ?
//                 <Segment basic style={{ marginTop: "15px" }}>
//                     <Placeholder fluid >
//                         <Placeholder>
//                             <Placeholder.Image rectangular />
//                         </Placeholder>
//                         <Segment basic floated="right" style={{ display: "flex" }}>
//                             {Array(3).fill(
//                                 <Card style={{ maxWidth: "250px", margin: "0px 5px 70px 5px" }}>
//                                     <Card.Content>
//                                         <Placeholder style={{ maxHeight: "200px" }}>
//                                             <Placeholder.Image square />
//                                         </Placeholder>
//                                     </Card.Content>
//                                     <Card.Content style={{ borderTop: "0px" }}>
//                                         <Placeholder >
//                                             <Placeholder.Header image>
//                                                 <Placeholder.Line />
//                                                 <Placeholder.Line />
//                                             </Placeholder.Header>
//                                         </Placeholder>
//                                     </Card.Content>
//                                 </Card>
//                             ).map((item) => {
//                                 return item
//                             })}
//                         </Segment>
//                     </Placeholder>
//                 </Segment>
//                 :
//                 <Container className="blog-banner" fluid >
//                     <Image src={header.background ?? Assets.defaultPlaceholders.landscape.img} fluid className={`blog-banner-image ${blurBg === true ? "blog-banner-image-hover" : null}`} />
//                     <Grid className="blog-label-wrapper" centered stackable >
//                         <Grid.Row >
//                             <Grid.Column widescreen={4} largeScreen={4} computer={16} tablet={16} mobile={16} verticalAlign="middle" textAlign="left">
//                                 <Card className="blog-head-card" fluid>
//                                     <Card.Content>
//                                         <Card.Meta as="b">
//                                             {moment(header.date).utc().format('YYYY-MM-DD')}
//                                         </Card.Meta>
//                                         <Divider />
//                                         <Card.Header className="label-header" title={header.heading}>
//                                             {header.heading}
//                                         </Card.Header>
//                                         <Card.Description className="label-description">
//                                             {header.description}
//                                         </Card.Description>
//                                     </Card.Content>
//                                     <Card.Content extra>
//                                         <Button circular basic size="mini" compact color="black" onClick={() => onHandleRead(header)} >
//                                             Read More
//                                         </Button>
//                                     </Card.Content>
//                                 </Card>
//                             </Grid.Column>
//                             <Grid.Column widescreen={10} largeScreen={10} computer={16} tablet={16} mobile={16} verticalAlign="middle" >
//                                 <Card.Group className="cards-wrapper" >
//                                     {(state || []).map((item, index) => {
//                                         return (
//                                             <Card onMouseEnter={() => onHandleHover(item)} key={index} className="blog-label-card" raised fluid>
//                                                 <Image src={item.img.thumbnail ?? Assets.defaultPlaceholders.portrait.img} className="blog-label-img-wrapper" fluid />
//                                                 <Card.Header as="h2" textAlign="left" className="card-label-before">
//                                                     {item.title}
//                                                 </Card.Header>
//                                                 <Card.Content className="blog-label-card-content"  >
//                                                     <Card.Header as="h1">{item.heading}</Card.Header>
//                                                     <Card.Description as="p" className="label-description">
//                                                         {item.desc}
//                                                     </Card.Description>
//                                                     <Divider />
//                                                     <Card.Meta>
//                                                         {moment(item.date).utc().format('YYYY-MM-DD')}
//                                                         <Icon name="arrow right" circular link onClick={() => onHandleRead(item)} />
//                                                     </Card.Meta>
//                                                 </Card.Content>
//                                             </Card>
//                                         )
//                                     })}
//                                 </Card.Group>
//                             </Grid.Column>
//                             <Grid.Column widescreen={1} largeScreen={1} computer={16} tablet={16} mobile={16} verticalAlign="middle" textAlign="center">
//                                 <Button size="massive" circular icon='arrow right' as={Link} to={NavigationPaths.BLOGS} />
//                             </Grid.Column>
//                         </Grid.Row >
//                     </Grid>
//                 </Container>}
//         </>
//     )
// };

// export default React.memo(BlogPage);

