import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import {
  Card,
  Tooltip,
  Col,
  Row,
  Button,
  Skeleton, notification
} from 'antd';
import React, {Component, useState} from 'react';
import {connect} from 'umi';
import styles from './index.less';
import {history} from 'umi';

const {Meta} = Card;

class CartHome extends Component {

  state = {
    totalAmount: undefined
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getTotalAmountAndUpdate()
  }

  componentDidUpdate(prevProps) {
  }

  getTotalAmountAndUpdate = () => {
    const {cartDetailsObj, productsList} = this.props;
    let total = 0;
    if (Array.isArray(productsList) && productsList.length && Object.keys(cartDetailsObj).length) {
      for (const i in productsList) {
        const {id, price} = productsList[i];
        if (Object.keys(cartDetailsObj).indexOf(`${id}`) >= 0) {
          total += price * cartDetailsObj[id]
        }
      }
      console.log(total, 'total');
      this.setState({
        totalAmount: total && total.toFixed(2)
      })
    }
  };

  handleProceedAndPay = () => {
    notification.success({
      message: 'Your Dummy Order Placed'
    })
  }

  render() {
    const {cartDetailsObj, productsList} = this.props;
    const {totalAmount} = this.state;
    return (
      <div>
        {Object.keys(cartDetailsObj) && Object.keys(cartDetailsObj).length ? (
          <div>
            <div className={styles.headerContainer}>
              <Button onClick={() => history.push('/home')} type='link'>
                <ArrowLeftOutlined/>
              </Button>
              <span className={styles.headerLabel}>Cart Details</span>
            </div>
            {productsList.map((item, index) => {
              const {id, image, price, title, description} = item;
              if (Object.keys(cartDetailsObj).indexOf(`${id}`) >= 0) {
                return (
                  <Card hoverable key={id}>
                    <div className={styles.cartCardContainer}>
                      <div>
                        <span style={{fontWeight: 600, paddingRight: 8}}>{title}</span> <span
                        style={{color: 'blue'}}> X {cartDetailsObj[id]}</span>
                        <div>
                          <span style={{color: 'gray'}}>Rate: ₹ {price}</span>
                        </div>
                      </div>
                      <div>
                        <span style={{fontWeight: 600}}>₹ {price * cartDetailsObj[id]}</span>
                      </div>
                    </div>
                  </Card>
                )
              }
              return null;
            })}

            {totalAmount ? (
              <div className={styles.bottomContainer}>
                <div className={styles.summaryActionContainer}>
                  <span>Total Amount: {totalAmount}</span>
                </div>
                <Button
                  type='primary'
                  style={{width: 200}}
                  onClick={this.handleProceedAndPay}
                >
                  Proceed & Pay
                </Button>
              </div>
            ) : null}


          </div>
        ) : (
          <h1>Add something to your cart.</h1>
        )}
      </div>
    )
  }
}


export default connect(({home, loading}) => ({
  productsList: home.productsList,
  cartDetailsObj: home.cartDetailsObj,
}))(CartHome);
