import './App.css';
import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Highcharts, { objectEach } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ArtificialTrend extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      series: [],
      categories: [],
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
    
  }

  //チェックボックスの雛形
  make_check_box(id, city){
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

  //反転
  toggle(id){
    var flag_copy = this.state.city_flags.slice();
    //更新
    flag_copy[id] = !flag_copy[id];
    //追加
    if(!this.state.city_flags[id]){
      this.get_series(id)
    }
    //削除
    else{
      this.remove_series(id)
    }
    //保存
    this.setState({
      city_flags: flag_copy
    })
  }

  //データ取得
  get_series(id){
    fetch("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode="+String(id+1), {
      headers: {"X-API-KEY": this.get_API_KEY()}
    })
    .then(response => response.json())
    .then(json => {
      //年度
      var categories = [];
      //人口
      var num = [];
      Object.keys(json.result.data[0].data).forEach(i => {
        categories.push(json.result.data[0].data[i].year);
        num.push(json.result.data[0].data[i].value);
      });
      const new_series = {
        name: this.state.cities[id],
        data: num,
      };
      //初回のみ更新
      if(this.state.categories.length === 0){
        this.setState({
          categories: categories
        })
      }
      this.setState({
        series: [...this.state.series, new_series]
      });
    })
  }

  //データ削除
  remove_series(id){
    const series_copy = this.state.series.slice();
    for(var i=0; i<series_copy.length; i++){
      if(series_copy[i].name === this.state.cities[id]){
        series_copy.splice(i, 1);
      }
    }
    this.setState({
      series: series_copy
    });
  }

  //グラフの表示
  make_graph(){
    const options = {
      title: {
        text: "人口推移"
      },
      xAxis: {
        title: {
          text: "年度"
        },
        categories: this.state.categories
      },
      yAxis: {
        title: {
          text: "人口数"
        }
      },
      series: this.state.series
    }
    return(
      <HighchartsReact highcharts={Highcharts} options={options} />
    )
  }

  //表示
  render(){
    var list = this.state.cities;
    
    return(
      <div>
        <div>都道府県</div>
        <div class="checkbox_wrapper">
          {list.map((city, i) => (this.make_check_box(i, city)))}
        </div>
        <div>
          {this.make_graph()}
        </div>
      </div>
    )
  }
}

export default ArtificialTrend;
