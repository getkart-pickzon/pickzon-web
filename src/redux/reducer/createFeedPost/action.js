import createFeedPostType from "./createFeedPostType";

export const actionCreateFeedPost = () => {
    return {
        type: createFeedPostType.activity_data,
        payload: [],
    };
}