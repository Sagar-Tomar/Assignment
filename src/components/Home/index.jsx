import {Badge, Button, Dropdown} from 'antd';
import React from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import styles from './index.less';
import { history } from 'umi';


const HomeHeader = ({title = '', numberOfItemsInCart}) => (
  <div className={styles.headerContainer}>
    <span>
    {title}
    </span>
    <Badge count={numberOfItemsInCart}>
      <Button
        type="primary"
        onClick={() => history.push('/cart')}
      >
        <ShoppingCartOutlined/>
        Cart
      </Button>
    </Badge>
  </div>
);

export default HomeHeader;
