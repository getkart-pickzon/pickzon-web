import React, { useEffect, useState, useCallback } from "react";
import { Container, Dropdown, Icon, Input, Card, Image, Feed, Pagination, Placeholder, Label, Grid } from "semantic-ui-react";
import { useHistory } from "react-router";
import { GET, POST } from "../../../../../Services";
import { BLOG } from "../../../../../route/apiPath";
import { makeUserProfileImgURL } from "../../../../../utils/common";
import { notifyToast } from "../../../../../utils/Toast";
import moment from "moment";
import CONFIG from "../../../../../config/config.js"
import Assets from '../../../../../assets/Assets'
import BlogVideoHead from "./blogVideoHead/BlogVideoHead";
import './style.css'

const requestObj = {
    "pageLimit": 9,
    "pageNumber": "",
    "search": "",
    "category": "",
    "sort": { field: "", order: "" }
};

const Blogs = () => {
    const [state, setState] = useState({
        search: requestObj.search ?? "",
        allBlogsList: [],
        categoryList: [],
        categoryValue: '',
        totalPages: '',
        isLoader: false,
    });
    const [loader, setLoader] = useState(0)
    const [filterIcon, setFilterIcon] = useState(false)
    const router = useHistory();

    useEffect(() => {
        fetchAllBlogsList();
        fetchBlogCategories();

    }, []);

    const fetchAllBlogsList = useCallback(async () => {
        try {
            let { status, message, totalPages, totalRecords, payload } = await POST(BLOG.FETCH_ALL, requestObj);
            if (status === 0) {
                return console.error(message);
            }
            setLoader(status);
            setState((pre) => ({
                ...pre,
                allBlogsList: payload,
                totalPages,
            }));
        } catch (err) {
            console.log(err);
        };
    });

    const fetchBlogCategories = async () => {
        try {
            let { status, message, payload } = await GET(BLOG.FETCH_CATEGORIES, {});
            if (status === 0) {
                return console.error(message);
            }
            let arr = (payload || []).map((el) => ({
                key: el._id,
                text: el.title,
                value: el.title
            }));
            arr.unshift({
                key: 0,
                text: "All",
                value: "All"
            })
            setState((pre) => ({
                ...pre,
                categoryList: arr
            }));
        } catch (er) {
            console.log(er);
        }
    };

    const onHandleSelect = (e, data) => {
        let search = state.categoryList.find(element => element.value === data.value);
        try {
            if (search.key === 0) {
                requestObj.category = ""
            } else {
                setState((pre) => ({
                    ...pre,
                    categoryValue: search.value
                }))
                requestObj.category = search.key
            }
            fetchAllBlogsList();
        } catch (er) {
            console.log(er);
        };

    };

    const onHandleSearch = (e) => {
        try {
            let value = e.target.value;
            setState((pre) => ({
                ...pre,
                search: value
            }))
            if (value.length > 3) {
                requestObj.search = value;
                fetchAllBlogsList();
            } else if (value.length === 0) {
                requestObj.search = "";
                fetchAllBlogsList();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onHandleSort = () => {
        try {
            setFilterIcon(!filterIcon);
            requestObj.sort.field = "createdAt";
            requestObj.sort.order = filterIcon ? -1 : 1
            notifyToast(`Shown by ${filterIcon ? "Latest" : "Oldest"} blogs`, "success")
            fetchAllBlogsList();
        } catch (err) {
            console.log(err);
        }
    };

    const onHandlePage = async (e, data) => {
        try {
            let pageNum = data.activePage - 1;
            requestObj.pageNumber = pageNum;
            fetchAllBlogsList();
        } catch (err) {
            console.log(err);
        }
    };

    const onHandleRead = (item) => {
        router.push({
            pathname: '/blog/' + item.slug
        })
    };

    return (
        <>
            <Container fluid style={{ marginBottom: "4rem" }} className="scroller">
                <BlogVideoHead />
                <Container >
                    <Grid padded>
                        <Grid.Row columns={2}>
                            <Grid.Column className="blog-grid-menu-box left-bottom" textAlign="center" widescreen={8} largeScreen={8} computer={8} tablet={8} mobile={16}>
                                <Label className="nomobiledata" as="h1" basic size="huge" style={{ border: "0px" }}> Blogs </Label>
                                <Input className='icon' icon='search' placeholder='Search by title...' value={state.search} onChange={(e) => onHandleSearch(e)} />
                                <Label basic size="large" style={{ padding: "10px", cursor: "pointer" }} onClick={() => onHandleSort(true)} >
                                    <Icon name={filterIcon === true ? "sort amount up" : "sort amount down"} style={{ margin: "0px" }} />
                                </Label>
                            </Grid.Column>
                            <Grid.Column className="blog-grid-menu-box right-bottom" textAlign="center" widescreen={8} largeScreen={8} computer={8} tablet={8} mobile={16}>
                                <Pagination
                                    className="pagination"
                                    boundaryRange={null}
                                    defaultActivePage={1}
                                    siblingRange={0}
                                    firstItem={null}
                                    lastItem={null}
                                    pointing
                                    secondary
                                    totalPages={state.totalPages}
                                    onPageChange={(e, data) => onHandlePage(e, data)}
                                />
                                <Dropdown
                                    fluid
                                    placeholder='Category'
                                    style={{ marginLeft: "10px", width: "200px" }}
                                    // search
                                    selection
                                    options={state.categoryList}
                                    onChange={(e, data) => onHandleSelect(e, data)}

                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            {loader === 0 ?
                                <React.Fragment>
                                    {Array(requestObj.pageLimit).fill(
                                        <Grid.Column mobile={16} tablet={8} computer={4}>
                                            <Card style={{ width: "320px", margin: "10px 20px", borderRadius: "25px", boxShadow: "0 4px 10px 0  #d4d4d5" }}>
                                                <Card.Content>
                                                    <Placeholder style={{ borderRadius: "25px" }}>
                                                        <Placeholder.Image square />
                                                    </Placeholder>
                                                </Card.Content>
                                                <Card.Content style={{ borderTop: "0px" }}>
                                                    <Placeholder >
                                                        <Placeholder.Paragraph>
                                                            <Placeholder.Line />
                                                            <Placeholder.Line />
                                                            <Placeholder.Line />
                                                        </Placeholder.Paragraph>
                                                        <Placeholder.Header image >
                                                            <Placeholder.Line />
                                                            <Placeholder.Line />
                                                        </Placeholder.Header>
                                                    </Placeholder>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    ).map((item, i) => {
                                        return <React.Fragment key={i}>
                                            {item}
                                        </React.Fragment>
                                    })}
                                </React.Fragment>
                                :
                                (state.allBlogsList || []).map((item, i) => (
                                    <Grid.Column mobile={16} tablet={8} computer={5} >
                                        <div onClick={() => onHandleRead(item)}>
                                            <Card key={i} className="blog-grid-card">
                                                <div className="blog-grid-img-wrapper">
                                                    <Image src={item.img?.thumbnail ?? Assets.defaultPlaceholders.portrait.img} alt={item.img?.alt} centered />
                                                </div>
                                                <Card.Content style={{ padding: "1em 0em", borderTop: "0px" }}>
                                                    <Label color={CONFIG.colorsPalete[Math.floor(Math.random() * CONFIG.colorsPalete.length)]}
                                                        style={{ borderRadius: "8px" }}>
                                                        {item.category.title}
                                                    </Label>
                                                    <Card.Header className="blog-grid-title" title={item.title}>
                                                        {item.title}
                                                    </Card.Header>
                                                    <Card.Description className="blog-grid-desc" title={item.desc}>
                                                        {item.desc}
                                                    </Card.Description>
                                                    <Feed style={{ position: "absolute", left: "5%", bottom: "1%" }}>
                                                        <Feed.Event>
                                                            <Feed.Label>
                                                                <Image src={makeUserProfileImgURL(item.postedBy.profileImage) ?? Assets.defaultPlaceholders.userProfile.img} alt={item.postedBy.name} style={{ borderRadius: "8px", maxHeight: "34px" }} />
                                                            </Feed.Label>
                                                            <Feed.Content>
                                                                <Feed.Date>
                                                                    {moment(item.createdAt).utc().format('YYYY-MM-DD')}
                                                                </Feed.Date>
                                                                <Feed.Summary>
                                                                    <Feed.User>
                                                                        {item.postedBy.name ?? "Pickzon"}
                                                                    </Feed.User>
                                                                </Feed.Summary>
                                                            </Feed.Content>
                                                        </Feed.Event>
                                                    </Feed>
                                                </Card.Content>
                                            </Card>
                                        </div>

                                    </Grid.Column>
                                ))}
                        </Grid.Row>
                    </Grid>
                </Container>
            </Container >
        </>
    )
};
export default React.memo(Blogs);