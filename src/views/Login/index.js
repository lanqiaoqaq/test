import React , {useState ,useEffect} from 'react'
import '../../App.css'
import {
    inject,
    observer
} from 'mobx-react'

const Login = ({store})=> {
    const [count , setCount] = useState(0);
    useEffect(()=>{
        document.title = `你点击了${count}次`;
    },[count])
    return(
        <div>
            <p>登录</p>
            <p>{store.num}</p>
            <p>{count}</p>
            <button type="primary" onClick={()=>setCount(count + 1)}>Click Me</button>
        </div>
    )
}
export default inject('store')(observer(Login));