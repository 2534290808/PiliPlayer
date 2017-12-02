/**
 * Created by lmy2534290808 on 2017/12/2.
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {
    requireNativeComponent,
    View,
} from 'react-native';
class Player extends Component {
    constructor(props, context) {
        super(props, context);
        this._onLoading = this._onLoading.bind(this);
        this._onPaused = this._onPaused.bind(this);
        this._onShutdown = this._onShutdown.bind(this);
        this._onPlayerError = this._onPlayerError.bind(this);
        this._onPlaying = this._onPlaying.bind(this);
    }
    _onLoading(event) {
        this.props.onLoading && this.props.onLoading(event.nativeEvent);
    }
    _onPaused(event) {
        this.props.onPaused && this.props.onPaused(event.nativeEvent);
    }
    _onShutdown(event) {
        this.props.onShutdown && this.props.onShutdown(event.nativeEvent);
    }
    _onPlayerError(event) {
        this.props.onPlayerError && this.props.onPlayerError(event.nativeEvent);
    }
    _onPlaying(event) {
        this.props.onPlaying && this.props.onPlaying(event.nativeEvent);
    }
    setNativeProps(nativeProps){
        this._root.setNativeProps(nativeProps)
    }
    render() {
        const nativeProps = Object.assign({}, this.props);
        Object.assign(nativeProps, {
            onLoading: this._onLoading,
            onPaused: this._onPaused,
            onShutdown: this._onShutdown,
            onPlayerError: this._onPlayerError,
            onPlaying: this._onPlaying,
        });
        return (
            <RCTPlayer
                ref={ref=>this._root=ref}
                {...nativeProps}
            />
        )
    }
}
Player.propTypes = {
    source: PropTypes.shape({                          // 是否符合指定格式的物件
        uri: PropTypes.string.isRequired,
        timeout: PropTypes.number, //Android only
        mediaCodec: PropTypes.oneOf([0,1,2]), //Android only
        liveStreaming: PropTypes.bool, //Android only
    }).isRequired,
    paused:PropTypes.bool,
    rotation:PropTypes.number,//设置角度
    muted:PropTypes.bool, //iOS only
    aspectRatio: PropTypes.oneOf([0, 1, 2, 3, 4]),
    onLoading: PropTypes.func,
    onPaused: PropTypes.func,
    onShutdown: PropTypes.func,
    onPlayerError: PropTypes.func,
    onPlaying: PropTypes.func,
    ...View.propTypes,
}
const RCTPlayer = requireNativeComponent('RCTPlayer', Player);
module.exports = Player;