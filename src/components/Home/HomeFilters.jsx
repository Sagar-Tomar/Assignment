import {Badge, Button, Col, Input, Pagination, Row, Select} from 'antd';
import React from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import styles from './index.less';
import {CATEGORIES_MASTER} from "@/services/Constants";


const HomeFilters = ({filterValuesObj,updateFilterValues}) => {
  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value: filterValuesObj.categories,
    options: CATEGORIES_MASTER,
    onChange: (newValue) => {
      if(updateFilterValues && typeof updateFilterValues === 'function'){
        updateFilterValues({
          categories: newValue
        });
      }
    },
    placeholder: 'Select Categories',
    maxTagCount: 'responsive',
  };

  function handlePaginationChange(page, pageSize) {
    if(updateFilterValues && typeof updateFilterValues === 'function'){
      updateFilterValues({
        page,
        pageSize
      });
    }
  }

  function handlePageChange(current, pageSize) {
    if(updateFilterValues && typeof updateFilterValues === 'function'){
      updateFilterValues({
        page: current,
        pageSize
      });
    }
  }

  function handleSearchTextChange(e) {
    const { value } = e.target;
    if(updateFilterValues && typeof updateFilterValues === 'function'){
      updateFilterValues({
        searchText: value
      });
    }
  }

  return (
    <div style={{padding: '16px 0px'}}>
      <span style={{paddingBottom: 8}}>Filters</span>
      <Row gutter={[36, 36]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Input
            placeholder="Search Product Name"
            onChange={handleSearchTextChange}
            vlaue={filterValuesObj.searchText}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Select {...selectProps} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div className={styles.paginatorContainer}>
            <Pagination
              showSizeChanger
              size="small"
              onShowSizeChange={handlePaginationChange}
              onChange={handlePageChange}
              current={filterValuesObj.page}
              pageSize={filterValuesObj.pageSize}
              total={filterValuesObj.total}
              pageSizeOptions={["8", "16", "24"]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomeFilters;
