import React,{ Component } from 'react';
import ReactDom from 'react-dom';
import './styles/common.css'

// components
import TrackInfo from './components/TrackInfo'
import Progress from './components/Progress'
import Controls from './components/Controls'
import Time from './components/Time'


class App extends Component {
    static defaultProps = {
        tracks:[
            {
                name:"理想三旬",
                artists:[
                    {
                        name:"陈鸿宇"
                    }
                ],
                album:{
                    name:"浓烟下的诗歌电台",
                    picUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519666032717&di=d87de2978bd37d3b28e6b332ee26529f&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fbafc569b1007fd694401d402c531fe226662fe37.jpg",
                },
                duration:210860,
                mp3Url:"http://other.web.rm01.sycdn.kuwo.cn/resource/n2/8/86/1865597221.mp3"
            },
            {
                name: "The Saltwater Room",
                artists: [
                    {
                        name: "Owl City",
                    }
                ],
                album: {
                    name: "The Best of Owl City ",
                    picUrl: "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=5a77056b73310a55d029d6a6d62c28cc/e850352ac65c1038fe02515ab8119313b07e892e.jpg",
                },
                duration:242625,
                mp3Url: "http://other.web.ra01.sycdn.kuwo.cn/resource/n3/19/37/3895718135.mp3"
            }
        ]
    }
    constructor(props){
        super(props);
        this.state = {
             currentTrackLen:this.props.tracks.length,  // 歌曲数
             currentTrackIndex:0, // 当前歌曲索引，
             currentTime:0,  // 当前歌曲播放时间
             currentTotalTime:0,     // 当前歌曲的总时间
             playStatus:true  // true 播放  false 暂停
        };
    }
    render(){
        return(
            <div className="player">
                {/*播放器名称*/}
                <div className="header">音乐播放器React版</div>

                <TrackInfo track={this.props.tracks[this.state.currentTrackIndex]}/>

                <Progress progress={ this.state.currentTime / this.state.currentTotalTime * 100 + '%'} />

                <Controls isPlay={ this.state.playStatus } onPlay={ this.play } onPrevious={ this.previous } onNext={ this.next }/>

                <Time currentTime={ this.state.currentTime } currentTotalTime={this.state.currentTotalTime} />

                <audio id="audio" src={ this.props.tracks[this.state.currentTrackIndex].mp3Url }></audio>
            </div>
        )
    }
    updatePlayStatus(){
        let audio = document.getElementById('audio');
        if(this.state.playStatus){
            audio.play();
        }else{
            audio.pause();
        }
        //更新当前歌曲总时间
        this.setState({currentTotalTime: this.props.tracks[this.state.currentTrackIndex].duration / 1000});
    }
    //播放事件处理
    play = () => {
        //这里有setState是异步的，需要在回调中执行
        console.log(this)
        this.setState({playStatus:!this.state.playStatus}, ()=>{
            this.updatePlayStatus();
        });
    }
    //上一曲事件处理
    previous = () => {
        if(this.state.currentTrackIndex - 1 < 0){
            this.setState({currentTrackIndex:(this.state.currentTrackLen - 1)},()=>{
                this.updatePlayStatus();
            });
        }else{
            this.setState({currentTrackIndex:--this.state.currentTrackIndex},()=>{
                this.updatePlayStatus();
            });
        }
    }
    //下一曲事件处理
    next = () => {
        if(this.state.currentTrackIndex + 1 >=  this.state.currentTrackLen){
            this.setState({currentTrackIndex:0},()=>{
                this.updatePlayStatus();
            });
        }else{
            this.setState({currentTrackIndex:++this.state.currentTrackIndex},()=>{
                this.updatePlayStatus();
            });
        }
    }
    componentDidMount(){
        this.updatePlayStatus();
        setInterval(()=>{
            let audio = document.getElementById('audio');
            this.setState({currentTime:audio.currentTime},()=>{
                if(~~this.state.currentTime >= ~~this.state.currentTotalTime){
                    this.next();
                }
            });
        }, 100);
    }
}

ReactDom.render(
    <App />,
    document.getElementById('musicApp')
)

