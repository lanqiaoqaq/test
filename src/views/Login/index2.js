import React from 'react'
import { inject , observer } from 'mobx-react'

import { Button } from 'antd-mobile';

const TestLogin = () => {
    return(
        <div>
            <p>1111</p>
            <Button variant="contained" color="primary">我是个按钮</Button>
        </div>
    )
}

export default inject('store')(observer(TestLogin))