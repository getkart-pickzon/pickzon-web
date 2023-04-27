import React, { useEffect, useState } from "react";
import { Menu, Image, Button, Placeholder } from "semantic-ui-react";
import { getUser, MenuPlaceholder, menuPlaceholder } from "../../../../../utils/common";
// import ClipGridView from "../../../../sub-component/clip/component/ClipGridView";
import SharedFeedListCard from "../../../../sub-component/sharedFeed/component/SharedFeedListCard";
import TagFeedListCard from "../../../../sub-component/tagFeed/component/TagFeedListCard";
import UploadMediaPost from "../../../../sub-component/uploadMediaPostIcons/uploadMediaPost";
import FeedCardUserData from "../../WallPostFeed/component/FeedCardUserData";

import feedCoreIcon from "../../../../../assets/images/feedBlack.svg"
// import clipCoreIcon from "../../../../../assets/images/clipBlack.svg"
import tagCoreIcon from "../../../../../assets/images/tagBlack.svg"
import shareCoreIcon from "../../../../../assets/images/shareBlack.svg"
import './style.css'


const CenterContent = ({ userID, loading }) => {
  const [state, setState] = useState({
    activeItem: 'feed',
    // feedCom: false
  });
  const loggedUser = getUser();
  const activeMenuBtn = (item) => {
    try {
      setState((pre) => ({
        ...pre,
        activeItem: item
      }));
    } catch (er) { console.log(er); };
  };

  // useEffect(() => {
  //   setState((pre) => ({ ...pre, feedCom: true }));
  // }, []);

  return (
    <>
      <Menu pointing borderless secondary widths={3} icon="labeled" className="sticky-center-panel">
        {loading === 0 ?
          <MenuPlaceholder columnCount={3} />
          :
          <>
            <Menu.Item
              active={state.activeItem === 'feed'}
              onClick={() => activeMenuBtn('feed')}
            ><Image src={feedCoreIcon} size="mini" />
            </Menu.Item>
            {/* <Menu.Item
          active={state.activeItem === 'clip'}
          onClick={() => activeMenuBtn('clip')}
          ><Image src={clipCoreIcon} size="mini" />
        </Menu.Item> */}
            <Menu.Item
              active={state.activeItem === 'tag'}
              onClick={() => activeMenuBtn('tag')}
            ><Image src={tagCoreIcon} size="mini" />
            </Menu.Item>
            <Menu.Item
              active={state.activeItem === 'share'}
              onClick={() => activeMenuBtn('share')}
            ><Image src={shareCoreIcon} size="mini" />
            </Menu.Item>
          </>
        }
      </Menu>
      {state.activeItem === 'feed' ?
        <>
          {loggedUser._id === userID ?
            <div style={{ display: "none" }}>
              <UploadMediaPost loading={loading} />
            </div>
            : null}
          <FeedCardUserData
            userId={userID}
          />
        </>
        :
        // <>
        //   {state.activeItem === 'clip' ?
        //     <ClipGridView
        //       userId={userID}
        //     /> :
        <>
          {state.activeItem === 'tag' ?
            <TagFeedListCard
              userId={userID}
            /> :
            <>
              {state.activeItem === 'share' ?
                <SharedFeedListCard
                  userId={userID}
                /> : ""}
            </>
          }
        </>
        //   }
        // </>
      }
    </>
  )
};

export default React.memo(CenterContent);