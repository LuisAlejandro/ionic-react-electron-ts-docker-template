import React from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import './os-patch.scss'


const SelectScrollbars = React.forwardRef<any, any>(({ children, ...props }, ref) => (
  <div {...props} ref={ref} className={`select-scrollbars ${props.className}`}>
    <OverlayScrollbarsComponent options={{ overflowBehavior: { x: 'hidden' }}}>
      {children}
    </OverlayScrollbarsComponent>
  </div>
));

export default SelectScrollbars;