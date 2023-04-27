import { Box } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../../component/organisms/PostCard';
import { onSetWallPostFeed } from '../../../redux/reducer/wallPostFeed';
import { FEED } from '../../../routes/apiEndPoints';
import { GET } from '../../../services';
import { CardPlaceholder } from '../../../utils/common';


const requestObj = {
    pageNumber: 1,
};
let arrayList = [];
const FeedModule = () => {
    const dispatch = useDispatch();
    const feedList = useSelector((state) => state.wallPostFeed.value);

    useEffect(() => {
        api_FetchWebMedia();
    }, []);

    const api_FetchWebMedia = async () => {
        try {
            let { status, message, payload } = await GET(FEED.GET_FEEDS, requestObj);
            if (status === 0) {
                console.log(message);
            }
            let isArray = [...arrayList, ...payload]
            arrayList = isArray
            dispatch(onSetWallPostFeed(arrayList));
        } catch (error) {
            console.error(error);
        }
    };

    const nextPage = useCallback(() => {
        try {
            requestObj.pageNumber = requestObj.pageNumber + 1;
            api_FetchWebMedia();
        } catch (er) { console.log(er); };
    }, [requestObj.pageNumber]);

    return (
        <>
            <InfiniteScroll
                dataLength={feedList.length}
                next={nextPage}
                style={{ padding: "1px", overflow: "hidden" }}
                hasMore={true}
                endMessage={<p style={{ textAlign: 'center' }}><b>No Data Available</b></p>}
                loader={<h4 style={{ textAlign: 'center' }}>
                    LOADING
                </h4>}
            >
                <CardPlaceholder listCount={10} />
            </InfiniteScroll>
        </>
    )
}

export default FeedModule;