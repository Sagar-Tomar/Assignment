import {
  PlusOutlined, MinusOutlined
} from '@ant-design/icons';
import {
  Card,
  Tooltip,
  Col,
  Row,
  Button,
  Skeleton
} from 'antd';
import React, {Component, PureComponent} from 'react';
import {connect} from 'umi';
import styles from '../index.less';

const {Meta} = Card;

class ItemCard extends PureComponent {

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  handleAddToCartClicked = () => {
    const {id, dispatch, cartDetailsObj} = this.props;
    const newCartDetailsObj = {...cartDetailsObj};
    if (newCartDetailsObj[id] && Number(newCartDetailsObj[id])) {
      newCartDetailsObj[id] += 1;
    } else {
      newCartDetailsObj[id] = 1;
    }
    dispatch({
      type: 'home/updateCartDetailsObj',
      payload: {
        cartDetailsObj: {...newCartDetailsObj}
      }
    })

  };

  handleRemoveOrReduceFromCart = () => {
    const {id, dispatch, cartDetailsObj} = this.props;
    const newCartDetailsObj = {...cartDetailsObj};
    if (newCartDetailsObj[id] && Number(newCartDetailsObj[id])) {
      newCartDetailsObj[id] -= 1;
    }
    if (!newCartDetailsObj[id]) {
      delete newCartDetailsObj[id];
    }
    dispatch({
      type: 'home/updateCartDetailsObj',
      payload: {
        cartDetailsObj: {...newCartDetailsObj}
      }
    })
  };


  render() {
    const {image, title, description, addedQtyCart} = this.props;
    return (
      <Card
        hoverable
        cover={
          <img
            alt="product"
            src={image}
            height={250}
          />
        }
      >
        <Meta
          title={(
            <Tooltip title={title}>
              <span>{title}</span>
            </Tooltip>
          )}
          description={(
            <Tooltip title={description}>
              <span>{description.substring(0, Math.min(description.length, 100))}...</span>

            </Tooltip>
          )}
        />
        <div className={styles.itemCardActionContainer}>
          {addedQtyCart && Number(addedQtyCart) > 0 ? (
            <>
              <Button
                onClick={this.handleRemoveOrReduceFromCart}
              >
                <MinusOutlined/>
              </Button>
              <span className={styles.addedQtyLabel}>
              {addedQtyCart}
              </span>
              <Button
                onClick={this.handleAddToCartClicked}
              >
                <PlusOutlined/>

              </Button>

            </>
          ) : (
            <Button
              onClick={this.handleAddToCartClicked}
            >
              <PlusOutlined/>
              Add to Cart
            </Button>
          )}
        </div>

      </Card>
    )
  }
}


export default connect(({home, loading}) => ({
  cartDetailsObj: home.cartDetailsObj,
}))(ItemCard);
