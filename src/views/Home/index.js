import React from 'react'
import {
    inject,
    observer
} from 'mobx-react'
@inject('store')
@observer
class Home extends React.Component{
    render(){
        const { num } = this.props.store
        return(
            <div>
                <div>2</div>
                <p>3</p>
                <span>{num}</span>
            </div>
        )
    }
}
export default Home;