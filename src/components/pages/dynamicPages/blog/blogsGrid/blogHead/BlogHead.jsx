// import moment from 'moment'
// import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// import { Card, Container, Grid, Placeholder, Segment, Icon, Image } from 'semantic-ui-react'
// import Assets from '../../../../../../assets/Assets'
// import { BLOG } from '../../../../../../route/apiPath'
// import { GET } from '../../../../../../Services'
// import { trimUserName } from '../../../../../../utils/common'
// import NormalSlider from '../../../../../sub-component/sliders/normalSlider/NormalSlider'


// const sliderStyle = {
//   preBtn: {
//     height: "fit-content",
//     position: "absolute",
//     left: "0px",
//     transform: "translateY(-50%)",
//     top: "50%",
//     background: "#367788",
//     zIndex: "9",
//     color: "white"
//   },
//   nextBtn: {
//     height: "fit-content",
//     position: "absolute",
//     right: "-5px",
//     transform: "translateY(-50%)",
//     top: "50%",
//     background: "#367788",
//     color: "white"
//   },
//   sliderWrapper: {
//     width: "100%"
//   },
// }

// const BlogHead = () => {
//   const router = useHistory();

//   const [header, setHeader] = useState({ background: "" ?? Assets.defaultPlaceholders.landscape.img });

//   const [sliderData, setSliderData] = useState([])

//   const [loader, setLoader] = useState(0)
//   useEffect(() => {
//     fetchLatestBlog();

//   }, []);

//   const fetchLatestBlog = async () => {
//     try {
//       let { status, message, payload } = await GET(BLOG.FETCH_LATEST, {});
//       if (status === 0) {
//         return console.error(message);
//       }
//       setLoader(status)
//       setHeader((prev) => ({
//         ...prev,
//         background: payload[0]?.img?.background,
//       }))
//       setSliderData(payload);
//     } catch (err) {
//       console.log(err)
//     }
//   };
//   const sliderCards = sliderData.map((item, i) => {
//     return (
//       <Card key={i} style={{
//         transform: 'scale(0.9)',
//         width: "300px",
//         height: "300px",
//         color: "white",
//         margin: "3rem auto",
//         borderRadius: "20px",
//         overflow: "hidden",
//         boxShadow: "rgb(0 0 0 / 25%) -15px 25px 10px -5px"
//       }}
//       >
//         <img src={item.img?.background} alt={item.img?.alt} style={{ display: "none" }} />
//         <Image src={item.img?.thumbnail} alt={item.img?.alt} style={{ height: "100%" }} />
//         <Card.Content style={{ position: "absolute", bottom: "0", border: "0", width: "100%" }}>
//           <Grid>
//             <Grid.Row style={{ height: "140px" }}>
//               <Grid.Column width={10}>
//                 <Card.Description as="p" style={{ margin: "0" }}>
//                   {moment(item.createdAt).utc().format('YYYY-MM-DD')}
//                 </Card.Description>
//                 <Card.Header as="h3" className="blog-grid-desc">
//                   {item.title}
//                 </Card.Header>
//               </Grid.Column>
//               <Grid.Column width={6} textAlign="center" style={{ borderLeft: "1px solid " }}>
//                 <Card.Description textAlign="left" as="p" style={{ display: "flex", flexDirection: "column" }}>
//                   By
//                   <b>
//                     {trimUserName(item.postedBy.name, 10) ?? "Pickzon"}
//                   </b>
//                 </Card.Description>
//                 <Card.Header as="h3">
//                   <Icon name="play circle" size="big" onClick={() => onHandleRead(item)} style={{ cursor: "pointer" }} />
//                 </Card.Header>
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </Card.Content>
//       </Card >
//     )
//   })

//   const onHandleRead = (item) => {
//     router.push({
//       pathname: '/blog/' + item.slug,
//       state: item._id
//     })
//   };

//   const afterSlideChange = () => {
//     const collection = document.querySelector(".slick-slide.slick-center");
//     const imageUrl = collection?.getElementsByTagName("img")[0].src;
//     setTimeout(() => {
//       setHeader((prev) => ({
//         ...prev,
//         background: imageUrl ?? Assets.defaultPlaceholders.landscape.img
//       }))
//     }, 100);
//   }
//   return (
//     <div>
//       {loader === 0 ?
//         <Segment basic style={{ margin: "1rem 0 15rem 0" }}>
//           <Placeholder fluid >
//             <Placeholder>
//               <Placeholder.Image rectangular style={{ height: "80vh" }} />
//             </Placeholder>
//             <Segment basic style={{ display: "flex", justifyContent: "center", position: "absolute", left: "0", right: "0", bottom: "-180px" }}>
//               {Array(3).fill(
//                 <Card style={{ maxWidth: "250px", margin: "0 20px", borderRadius: "25px" }}>
//                   <Card.Content>
//                     <Placeholder style={{ maxHeight: "200px", borderRadius: "25px" }}>
//                       <Placeholder.Image square />
//                     </Placeholder>
//                   </Card.Content>
//                   <Card.Content style={{ borderTop: "0px" }}>
//                     <Placeholder >
//                       <Placeholder.Header image>
//                         <Placeholder.Line />
//                         <Placeholder.Line />
//                       </Placeholder.Header>
//                     </Placeholder>
//                   </Card.Content>
//                 </Card>
//               ).map((item, i) => {
//                 return (
//                   <React.Fragment key={i}>
//                     {item}
//                   </React.Fragment>
//                 )
//               })}
//             </Segment>
//           </Placeholder>
//         </Segment>
//         :
//         <>
//           <div style={{
//             position: "relative",
//             height: "80vh",
//             overflow: "hidden",
//             width: "100%",
//             backgroundImage: `url('${header.background ?? Assets.defaultPlaceholders.landscape.img}')`,
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "50% 50%",
//             marginBottom: "18rem"
//           }}
//           >
//           </div>
//           <Container style={{ position: "absolute", bottom: "-120px", left: "0", right: "0" }}>
//             <NormalSlider
//               centerMode={true}
//               centerPadding={"0px"}
//               element={sliderCards}
//               slidesShow={3}
//               scrollShow={1}
//               autoplay={true}
//               slideShow1024={3}
//               slideShow768={2}
//               slideShow520={1}
//               slideShow480={1}
//               btnClr="white"
//               afterChange={afterSlideChange}
//               style={sliderStyle}
//             />
//           </Container>
//         </>
//       }
//     </div>
//   )
// }

// export default BlogHead;