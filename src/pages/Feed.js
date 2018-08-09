import React from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, NavBar, Icon } from 'antd-mobile';
import { Link } from 'dva/router';
import normal from 'components/css/basic.css';
import DiscoverListitem from 'components/DiscoverListItem';
import axios from 'axios';
let offset = 0;

class Dongbao extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            refreshing: false,
            height: document.documentElement.clientHeight,
        }
    }

    componentDidMount = () => {
        console.log(offset);
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        axios.post('/api/gofun', { offset: offset }).then((message) => {
            this.setState({
                data: message.data,
                height: hei,
            })
        })
    }

    onMyRefresh = () => {
        this.setState({
            refreshing: true,
        })
        offset += 1;
        let myoffset = offset * 18;
        axios.post('/api/gofun', { offset: myoffset }).then((message) => {
            let data = this.state.data.concat(message.data);
            this.setState({
                refreshing: false,
                data: data,

            })
        })
    }

    componentWillUnmouint = () => {
        offset = 0;
    }

    render() {
        let data = this.state.data;
        return (
            <div className={normal.Wrapper}>
                <NavBar leftContent={<Link to="/"><span style={{ color: '#fff' }}><Icon type="left" /></span></Link>}>饲料</NavBar>
                <div className={normal.discoverlist}>
                    {
                        <PullToRefresh
                            damping={100}
                            indicator={{ deactivate: '上拉可以刷新' }}
                            ref={el => this.ptr = el}
                            style={{
                                height: this.state.height,
                                overflow: 'auto',
                            }}
                            direction='up'
                            refreshing={this.state.refreshing}
                            onRefresh={this.onMyRefresh}
                        >
                            <div className={normal.discoverWrapper}>
                                {this.state.data.map((value, index) => (
                                    <div key={index} className={normal.discoverWrap}>
                                        <DiscoverListitem data={value} />
                                    </div>
                                ))}
                            </div>
                        </PullToRefresh>
                    }
                </div>
            </div>
        )
    }
}

export default Dongbao;