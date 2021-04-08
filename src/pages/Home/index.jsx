import {
  PlusOutlined
} from '@ant-design/icons';
import {
  Card,
  Tooltip,
  Col,
  Row,
  Button,
  Skeleton
} from 'antd';

import React, {Component, useState} from 'react';
import {connect} from 'umi';
import HomeHeader from "@/components/Home";
import HomeFilters from "@/components/Home/HomeFilters";
import ItemCard from "@/pages/Home/components/ItemCard";

const {Meta} = Card;

class Home extends Component {

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getListOfProducts();

  }

  componentDidUpdate(prevProps) {
  }

  getListOfProducts = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchListOfProducts',
      payload: {}
    })
  };

  updateFilterValues = (toSet) => {
    const {filterValuesObj, dispatch} = this.props;
    const updatedFilterValuesObj = {...filterValuesObj, ...toSet};
    dispatch({
      type: 'home/setItemStateAndUpdateData',
      payload: {
        data: {
          filterValuesObj: {...updatedFilterValuesObj}
        }
      }
    })

  };


  render() {
    const {productsListFiltered, filterValuesObj, cartDetailsObj, loadingProducts} = this.props;
    return (
      <div>
        <HomeHeader
          title='AlcoWhiz - Shopping Portal'
          numberOfItemsInCart={Object.keys(cartDetailsObj).length}
        />
        <HomeFilters
          filterValuesObj={filterValuesObj}
          updateFilterValues={this.updateFilterValues}
        />
        <div style={{padding: '16px 0px'}}>
          {loadingProducts ? (
            <Skeleton active/>
          ) : (
            <Row gutter={[36, 36]}>
              {productsListFiltered.map((item) => {
                const {image, id,title, description} = item;
                return (
                  <Col key={id} xs={24} sm={12} md={12} lg={8} xl={6}>
                    <ItemCard
                      id={id}
                      image={image}
                      title={title}
                      description={description}
                      addedQtyCart={cartDetailsObj[id]}
                    />
                  </Col>
                )
              })}
            </Row>
          )}
        </div>
      </div>
    )
  }
}


export default connect(({home, loading}) => ({
  productsList: home.productsList,
  productsListFiltered: home.productsListFiltered,
  filterValuesObj: home.filterValuesObj,
  cartDetailsObj: home.cartDetailsObj,
  loadingProducts: loading.effects['home/fetchListOfProducts']
}))(Home);
