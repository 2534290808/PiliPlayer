/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Dimensions,Button,ToastAndroid,LayoutAnimation
} from 'react-native';
import Player from './Player';
let {width,height}=Dimensions.get('window')
export default class player extends Component {
  constructor(){
    super();
    this.state={
       rotate:0,
        paused:false
    }
  }
  componentDidMount(){
  }
  showToast(text){
      ToastAndroid.show(text,ToastAndroid.SHORT)
  }
  render() {
    return (
      <View style={styles.container}>
        <Player
            paused={this.state.paused}
            ref={ref=>this.player=ref}
            source={{uri:'http://exam.xhbycm.net/test.flv',liveStreaming:true,mediaCodec:1}}
            style={{width,height:200,borderWidth:2,borderColor:'red',top:400,position:'absolute'}} rotation={0}
            onLoading={()=>{this.showToast('加载中')}} onPaused={()=>{this.showToast('暂停了')}}
            onPlaying={()=>{this.showToast('播放中')}} onShutdown={()=>{this.showToast('播放完成')}}/>
<View style={{zIndex:10000}}>
       <Button title={'放大'} onPress={()=>{
           LayoutAnimation.linear()
            this.player.setNativeProps({rotation:270,height:height,top:0})
        }}/>
  <Button title={'缩小'} onPress={()=>{
      this.player.setNativeProps({rotation:0,height:200,top:400})
  }}/>
    <Button title="播放" onPress={()=>{
        this.setState({
            paused:false
        })
    }}/>
    <Button title="暂停" onPress={()=>{
        this.setState({
            paused:true
        })
    }}/>
</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
      flex:1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('player', () => player);
