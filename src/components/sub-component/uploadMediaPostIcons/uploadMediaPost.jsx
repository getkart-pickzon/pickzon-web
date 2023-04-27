import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, Image, Button, Placeholder } from "semantic-ui-react";
import CreateFeedPost from "./component/Post/CreateFeedPost";
// import Clip from "./component/clip/Clip";
// import Camera from "./component/camera/Camera";
// import Group from "./component/group/Group";
// import Page from "./component/page/Page";
import iconPage from "../../../assets/images/createPage.svg"
import iconSaved from "../../../assets/images/saved.svg"
import iconGroup from "../../../assets/images/createGroup.svg"
import { MenuPlaceholder } from "../../../utils/common";
// import iconCamera from "../../../assets/images/camera.svg"
// import iconClip from "../../../assets/images/clip.svg"

const UploadMediaPost = ({ className, loading }) => {
  let router = useHistory();

  const menuItem = [
    {
      name: 'Post', icon: 'image', type: 1,
      component: <CreateFeedPost />
    },
    // {
    //   name: 'Clip', icon: iconClip, type: 0,
    //   // component: <Clip />
    //   component: "/coming-soon"
    // },
    // {
    //   name: 'Camera', icon: iconCamera, type: 0,
    //   // component: <Camera />
    //   component: "/coming-soon"
    // },
    {
      name: 'Group', icon: iconGroup, type: 0,
      // component: <Group />
      component: "/coming-soon"
    },
    {
      name: "Page", icon: iconPage, type: 0,
      // component: <Page />
      // component: "create-page-form"
      component: "/coming-soon"
    },
    {
      name: 'Saved', icon: iconSaved, type: 0,
      component: "/save-feed"
    },
  ];

  const callMenuRoute = (item) => {
    try {
      if (item.type === 1) { return }
      router.push(item.component);
    } catch (er) { console.log(er); };
  };

  return (
    <>
      <Menu
        borderless
        icon="labeled"
        widths={menuItem.length}
        secondary
        className={className}
      >
        {
          loading === 0 ?
            <MenuPlaceholder columnCount={4} />
            :
            <>
              {(menuItem || []).map((item, index) => {
                return (<Menu.Item key={index} onClick={() => callMenuRoute(item)}
                >
                  {item.type !== 0 ?
                    <>{item.component}</>
                    : <Image src={item.icon} size="mini" />
                  }
                  {item.name}
                </Menu.Item>)
              })}
            </>
        }
      </Menu>
    </>
  )
};

export default React.memo(UploadMediaPost);