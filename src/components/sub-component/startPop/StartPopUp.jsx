import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Image, Modal, List, Header } from 'semantic-ui-react';
import Assets from '../../../assets/Assets';
import NavigationPaths from '../../../route/navigationPath';
import { installAppBtn } from '../../../utils/common';

const StartPopUp = ({ call, parent }) => {
  const location = useLocation()
  let path = location.pathname.split("/")[1].split("-")[0]
  let route = NavigationPaths.APP_REFER.split("/")[1].split("-")[0]
  return (
    <div style={{ display: 'none !important' }}>
      {
        path === route ? null :
          <Modal
            closeIcon
            open={call}
            onClose={() => parent(false)}
            size="mini"
            className="pop-up"
          >
            <Modal.Content>
              <Header as="h2" textAlign='center' style={{ marginTop: "20px" }}>
                To get the app right now, click Install.
              </Header>
              <List style={{ width: "100%" }}>
                <List.Item>
                  <Image rounded src={Assets.defaultPlaceholders.favicon.img} size="mini" alt={Assets.defaultPlaceholders.favicon.alt} />
                  <List.Content>
                    <List.Header >PickZon</List.Header>
                    <List.Description style={{ padding: "0px" }}>
                      Pickzon, inc.
                    </List.Description>
                  </List.Content>
                  <Button positive compact floated='right' onClick={() => installAppBtn()} >
                    Install
                  </Button>
                </List.Item>
              </List>
              <Image src={Assets.popUp.onlyMobilePopUp.img ?? Assets.defaultPlaceholders.landscape.img} alt={Assets.popUp.onlyMobilePopUp.alt ?? Assets.defaultPlaceholders.landscape.alt} />
              <List.Description style={{ padding: "0px" }}>
                The PickZon app lets you express your feelings, create pages & groups, and connect with others!
              </List.Description>
            </Modal.Content>
          </Modal>
      }
    </div>
  )
}

export default StartPopUp