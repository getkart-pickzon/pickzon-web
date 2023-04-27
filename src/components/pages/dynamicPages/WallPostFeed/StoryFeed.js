import React from 'react'
import {Statistic, Image, Menu } from 'semantic-ui-react';
import _ from 'lodash';
import "./style.css"

const StoryFeed = () => {

  return (
    <>
      <Menu secondary>
        <Menu.Item className='story-user-item' >
          <Statistic >
            <Image
              className='story-img'
              src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
              centered
              circular
            />
            <p>
              Your Story
            </p>
          </Statistic>
        </Menu.Item>
        <Menu.Menu className='story-ribbon' >
          {(_.times(15, (i) => (
            <Menu.Item key={i} className='story-friends-item'>
              <Statistic >
                <Image
                  className='story-img'
                  src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
                  centered
                  circular
                />
                <p>
                  nonish {i + 1 * 5}
                </p>
              </Statistic>
            </Menu.Item>
          )))}
        </Menu.Menu>
      </Menu>
    </>
  )
};
export default StoryFeed;
