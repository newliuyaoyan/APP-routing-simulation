import React, { Component } from 'react';
import './App.css';
import View from './indexView';

import {
Link,
BrowserRouter as Router,
Route
} from 'react-router-dom'
import uuid from 'uuid'

var choose=function(name){
  var titlename=""
  switch(name){
    case "/":
    titlename = "首页"
    break
    case "/shopping_car":
    titlename ="购物车"
    break
    case "/list":
      titlename ="商品列表"
      break
      // case "/detail/:id"
    default:
     titlename = "商品详情"

  }
  return titlename
}
//模拟API的数据
const fakeApi = {
  //商品列表
  list : [
    {
      name : "iApple 苹果iPhoneXs/Xs Max （海外版激活有锁）移动联通4G手机赠卡贴 iPhoneXS Max深灰色 256GB美版两网有锁激活",
      price : " 6458.00",
      img : "http://img12.360buyimg.com/n5/s450x450_jfs/t1/34856/33/7555/145500/5cc7ed1eEaf7aa874/8d7358475b811af3.jpg",
      id : uuid()
    }
  ],
  //购物车列表
  shoppingCar : [],
  //获取全部商品（获取list数组）
  getlist : function(callback){
    callback(this.list)
  },
  getDetail : function(id,callback){
    callback(
        this.list.filter(e => e.id === id)[0]
    )
  },
  add : function(id,callback){
    this.shoppingCar.push(
      this.list.filter(e => e.id === id)[0]
    )
    callback({code : 200 , msg : "添加成功"})
  },
  getShoppingCar : function(callback){
    callback(
      this.shoppingCar
    )
  }
}
class BottomBar extends Component{
  render(){
    return(
     <div className="bottom-bar">
       <Link className="bottom-bar-button" to="/">首页</Link>
       <Link className="bottom-bar-button" to="/shopping_car">购物车</Link>
     </div>
    )
  }
}

class Nav extends Component{
  render() {
    return(

      <Route
      path="/"
      children={(routeProps)=>{
        var button = routeProps.location.pathname === '/'? false :true
        var pathname = routeProps.location.pathname
        var pagename = choose(pathname)
        return(
          <div className="nav">
              {
                button ? (
                  <button className="back" onClick={routeProps.history.goBack}>{"<"}</button>
                ):''
              }
              <p className="page-title">{pagename}</p>
          </div>
        )
      }}
      >

      </Route>
    )
  }
}



class DetailView extends Component{
  state = {
    data : {}
  }
  componentWillMount(){
   var id = this.props.match.params.id
   fakeApi.getDetail(id,(data)=>{
     this.setState({
       data : data? data :{}
     })
   })
  }
  onAddToShoppingCar(id){
    fakeApi.add(id, ()=>{
      this.props.history.push('/shopping_car')
    })
  }
  render(){
    const {data} = this.state
    return(
      <div className="detail-view">
        <img className = "detail-img" src = {data.img}></img>
        <p className = "detail-name">{data.name}</p>
        <p className = "detail-price">{data.price}</p>
        <div className = "bottom-bar">
          <button className = "bottom-button" onClick={()=>this.onAddToShoppingCar(data.id)}>加入购物车</button>
          <button className = "bottom-button" id ="buynow">立即购买</button>
          
        </div>
      </div>
    )
  }
}

class ListView extends Component{
  state={
      data:[]
  } 
  
  componentWillMount(){
    fakeApi.getlist((data)=>{
          this.setState({
              data:data
          })
      })
  }
    render() {
        const {data} = this.state
        return(
          <ul className="list">
              {
                  data.map((v,k)=>(
                      <li  key={v.id}>
                          <Link to={`/detail/${v.id}`} className="item">
                              <img src={v.img} className="item-img"></img>
                              <div className = "item-wrap">
                              <p className = "item-name">{v.name}</p>
                              <p className = "item-price">{v.price}</p>
                              </div>
                              
                          </Link>
                      </li>
                  ))
              }
          </ul>
        )
    }
}

class ShoppingCarView extends Component{
  state ={
    data :[]
  }
  componentWillMount(){
    fakeApi.getShoppingCar((data)=>{
      this.setState({data : data})
    })
    
  }
  render(){
    const {data} = this.state
    console.log(fakeApi.shoppingCar)
    return(
      <ul className = "shopping-view">
                    {data.map((v,k)=>(
                      
                      <Link to={`/detail/${v.id}`} key={v.id+k}>
                      <li className="shoppingcar-item" >
                              <img src={v.img} className="item-img"></img>
                              <div className = "item-wrap">
                              <p className = "item-name">{v.name}</p>
                              <p className = "item-price">{v.price}</p>
                              </div>
                      </li>
                      </Link>
                  ))}
      </ul>
    )
  }
}

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Nav></Nav>
          <div className = "App-main-view">
            <Route className = "main-view" path = '/' exact component = {View}></Route>
            <Route className = "main-view" path = '/list' exact component = {ListView} ></Route> 
            <Route className = "main-view" path = '/detail/:id' exact component = {DetailView}></Route>
            <Route className = "main-view" path = '/shopping_car' exact component = {ShoppingCarView}></Route>
          </div>
          <Route path='/' exact component={BottomBar}></Route>
         
        </div>
      </Router>
    );
  }
 
}

export default App;
