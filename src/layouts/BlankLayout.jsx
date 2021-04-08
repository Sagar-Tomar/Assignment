import React from 'react';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout = ({ children }) => {
  return <InspectorWrapper>
    <div style={{padding: '8px 16px'}}>
    {children}
    </div>
  </InspectorWrapper>;
};

export default Layout;
