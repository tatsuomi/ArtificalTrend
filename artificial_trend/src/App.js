import './App.css';
import React from 'react';
import { Component } from 'react/cjs/react.production.min';

class ArtificialTrend extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cities: this.get_cities(),
      city_flags: Array(47).fill(false)
    };
  }

  //都道府県取得
  get_cities(){
    //仮の都道府県配列
    var tmp_cities = [];
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures/", {
      headers: {"X-API-KEY": this.get_API_KEY()}
    })
    .then(response => response.json())
    .then(json => {
      for(var i=0; i<json.result.length; i++){
        tmp_cities.push(json.result[i].prefName);
      }
    });
    return tmp_cities;
  }

  get_API_KEY(){

  }

  //表示
  render(){

  }
}

export default ArtificialTrend;
