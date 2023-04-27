import createFeedPostType from "./createFeedPostType";

let initialState = {
    expression: {},
    wallPostCallback: 0,
    feelingId: "",
    activityId: "",
    taggedPeoples: [],
    editWallPost: {}
};

export const createFeedPostReducers = (state = initialState, action) => {
    switch (action.type) {
        case createFeedPostType.feeling_data:
            return {
                ...state,
                feelingId: action.payload,
            };

        case createFeedPostType.activity_data:
            return {
                ...state,
                activityId: action.payload,
            };
        case createFeedPostType.tagPeople_data:
            return {
                ...state,
                taggedPeoples: action.payload,
            };
        case createFeedPostType.expression_data:
            return {
                ...state,
                expression: action.payload,
            };
        case createFeedPostType.wallPostCallback:
            return {
                ...state,
                wallPostCallback: action.payload,
            };
        case createFeedPostType.editWallPost:
            return {
                ...state,
                editWallPost: action.payload,
            };

        default:
            return { ...state };
    };
};