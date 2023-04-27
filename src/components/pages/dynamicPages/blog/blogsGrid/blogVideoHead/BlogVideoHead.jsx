import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Image, Feed, Icon, Placeholder } from 'semantic-ui-react'
import { GET } from '../../../../../../Services';
import { BLOG } from '../../../../../../route/apiPath';
import moment from 'moment';
import Assets from '../../../../../../assets/Assets';
import ReactPlayer from 'react-player';
import "../../style.css";

let playerWidth = "100%"
let plearMaxHeight = "auto"

const BlogVideoHead = () => {
  const [state, setState] = useState({});
  const [loader, setLoader] = useState(0)
  const router = useHistory();

  useEffect(() => {
    fetchLatestBlog();
  }, [])

  const fetchLatestBlog = async () => {
    try {
      setLoader(0);
      let { status, message, payload } = await GET(BLOG.FETCH_LATEST, {});
      if (status === 0) {
        return console.error(message);
      }
      setLoader(status);
      setState(payload[0]);
    } catch (err) {
      console.log(err)
    }
  };

  const onHandleRead = (data) => {
    router.push({
      pathname: '/blog/' + data.slug,
    })
  };

  return (
    <>
      <section className='banner-section'>
        <Image src={Assets.blog.blogBanner.img ?? Assets.defaultPlaceholders.landscape.img} alt={Assets.blog.blogBanner.alt ?? Assets.defaultPlaceholders.landscape.alt} style={{ width: "100%" }} />
      </section>
      <section>
        {loader === 0 ?
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column widescreen={10} largeScreen={10} computer={10} tablet={8} mobile={16}>
                  <Placeholder fluid style={{ height: 300 }}>
                    <Placeholder.Image style={{ height: 300 }} />
                  </Placeholder>
                </Grid.Column>
                <Grid.Column widescreen={6} largeScreen={6} computer={6} tablet={8} mobile={16}>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                  {Array(2).fill(
                    <Placeholder>
                      <Placeholder fluid>
                        <Placeholder.Line length='full' />
                        <Placeholder.Line length='full' />
                        <Placeholder.Line />
                      </Placeholder>
                    </Placeholder>
                  ).map((item, i) => {
                    return <React.Fragment key={i}>{item}</React.Fragment>
                  })}
                  <Placeholder style={{ height: "50px", width: "150px", borderRadius: "30px", maxWidth: "150px" }}>
                    <Placeholder.Image />
                  </Placeholder>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          :
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column className="blog-video-custom1" widescreen={10} largeScreen={10} computer={8} tablet={8} mobile={16}>
                  <div style={{ margin: "0 0 1.5rem 0" }}>
                    <ReactPlayer
                      width={playerWidth}
                      height={plearMaxHeight}
                      url={state?.videoUrl ?? Assets.defaultPlaceholders.landscape.img}
                      playing={true}
                      controls={true}
                      loop
                      className="blogs-list"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column className="blog-video-custom" widescreen={6} largeScreen={6} computer={8} tablet={8} mobile={16}>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label>
                        <Image src={state?.postedBy?.profileImage ?? Assets.defaultPlaceholders.userProfile.img} alt={state?.postedBy?.name ?? Assets.defaultPlaceholders.userProfile.alt} size='tiny' />
                      </Feed.Label>
                      <Feed.Content style={{ margin: "0 1em" }}>
                        <Feed.Summary>
                          <Feed.User>{state?.postedBy?.name ?? state?.postedBy?.tiktokName}</Feed.User>
                        </Feed.Summary>
                        <Feed.Meta>
                          <Feed.Date>
                            <Icon name='clock outline' />{moment(state?.createdAt).utc().format('YYYY-MM-DD')}
                          </Feed.Date>
                        </Feed.Meta>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                  <h1>{state?.title}</h1>
                  <p className='blog-grid-desc' style={{ fontSize: "1.3rem" }}>{state?.desc}</p>
                  <Button color="blue" style={{ borderRadius: "30px" }} onClick={() => onHandleRead(state)}>Read More</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        }
      </section>
    </>
  )
}

export default BlogVideoHead;