import './App.css';
import React from 'react';
import { Component } from 'react/cjs/react.production.min';

class ArtificialTrend extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city_flags: Array(47).fill(false)
    };
  }

  //都道府県取得
  componentDidMount(){
    //仮の都道府県配列
    var tmp_cities = [];
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures/", {
      headers: {"X-API-KEY": this.get_API_KEY()}
    })
    .then(response => response.json())
    .then(json => {
      for(var i=0; i<json.result.length; i++){
        tmp_cities.push(json.result[i].prefName)
      }
      this.setState({cities: tmp_cities}, ()=>{})
    });
  }

  //APIキー取得
  get_API_KEY(){
    return "FX1Q4Ui8pG7bMwh3exU6mZEd6azQNVlpXsYi4pcs";
  }

  //チェックボックスの雛形
  check_box(id, city){
    console.debug(id);
    return(
      <div class="checkbox">
        <input 
          type="checkbox"
          checked={this.state.city_flags[id]}
          onChange={() => this.toggle(id)}
        />
          {city}
      </div>
    );
  }

  //flagの反転
  toggle(id){
    var flag_copy = this.state.city_flags.slice();
    //更新
    flag_copy[id] = !flag_copy[id];
    //保存
    this.setState({
      city_flags: flag_copy
    })
  }

  //表示
  render(){
    var list = this.state.cities;
    
    return(
      <div>
        <div>都道府県</div>
        <div class="checkbox_wrapper">
          {list.map((city, i) => (this.check_box(i, city)))}
        </div>
      </div>
    )
  }
}

export default ArtificialTrend;
