import './App.css';
import React from 'react';
import { Component } from 'react/cjs/react.production.min';

class ArtificialTrend extends Component{
  constructor(props) {
    super(props);
    this.state = {
      API_KEY: "",
      cities: [],
      city_flags: Array(47).fill(false)
    };
    this.get_API_KEY();
    this.get_cities();
  }

  //都道府県取得
  get_cities(){
    //仮の都道府県配列
    var tmp_cities = [];
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures/", {
      headers: {"X-API-KEY": this.state.API_KEY}
    })
    .then(response => response.json())
    .then(json => {
      for(var i=0; i<json.result.length; i++){
        tmp_cities.push(json.result[i].prefName);
      }
    });
    this.setState({cities: tmp_cities});
  }

  get_API_KEY(){

  }

  //表示
  render(){
  }
}

export default ArtificialTrend;
