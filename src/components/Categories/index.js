import React, {useState} from 'react';
import Container from '../utilsComponents/Container';
import { Tabs, Icon } from 'antd';
import AllCategories from './AllCategories';
import FavouriteCategories from './FavouriteCategories';

const { TabPane } = Tabs;

export default function Categories() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  return (
    <Container>
      <Tabs
        activeKey={activeTabKey}
        onTabClick={(key) => {setActiveTabKey(key)}}
        tabBarStyle={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 500
        }}
      >
        <TabPane tab={TabPlaceholder('All categories', 'read')} key="1">
          <AllCategories />
        </TabPane>
        <TabPane tab={TabPlaceholder('Favourite categories', 'star')} key="2">
          <FavouriteCategories handleTabChange={setActiveTabKey} />
        </TabPane>
      </Tabs>
    </Container>
  );
}

const TabPlaceholder = (name, icon) => (
  <>
    <Icon type={icon} />{' '}
    <span style={{ fontSize: 18, verticalAlign: 'middle' }}>{name}</span>
  </>
);
