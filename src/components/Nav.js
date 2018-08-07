import React from 'react';

import { Carousel, WingBlank } from 'antd-mobile';
import axios from "axios";

class Nav extends React.Component {
    state = {
        data: [],
        imgHeight: 176,
    }
    componentDidMount() {
        axios.get('/api/photo/show').then(message => {
            const data = message.data;
            console.log(data);
            
            this.setState({
                data
            })
        });
    }
    render() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite={true}
                >
                    {this.state.data.map(val => (
                        <a 
                            href={val.link}
                            key={val.id}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                             <img
                                src={val.url}
                                alt={val.url}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </WingBlank>
        );
    }
}

export default Nav;
