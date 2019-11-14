import React from 'react'
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'
import axios from 'axios'
import { PullToRefresh, ListView } from 'antd-mobile';

class LongList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            lastUpdateTime : 1503639064232 ,
            dataArr : [],
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
    }
    componentDidMount() {
        this.genData();    
    }
    async genData(before = 1503639064232) {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        const {data} = await axios.get(`/top/playlist/highquality?before=${before}&limit=10`);
        this.setState({dataArr : [...this.state.dataArr,...data.playlists]})
        this.setState({
            lastUpdateTime : this.state.dataArr[this.state.dataArr.length - 1].updateTime,
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataArr),
            height: hei,
            refreshing: false,
            isLoading: false,
        });
    }
    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true ,dataArr : []});
        this.genData();
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.genData(this.state.lastUpdateTime);
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}
                    style={{
                        padding: '0 15px',
                        backgroundColor: 'white',
                    }}
                >
                   <p>{rowID - 0 + 1}</p>
                   <p>{rowData.name}</p>
                   <p><img src={rowData.coverImgUrl} alt="" style={{height:'2rem',width:'100%'}} /></p>
                   <p>{rowData.description}</p>
                </div>
            );
        };
        return (<div>
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderSeparator={separator}
                renderRow={row}
                style={this.state.useBodyScroll ? {} : {
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '5px 0',
                }}
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onEndReached={this.onEndReached}
                pageSize={20}
            />
        </div>);
    }
}
export default LongList;