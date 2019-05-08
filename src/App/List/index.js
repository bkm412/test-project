import React, {Component} from 'react';
import _ from 'lodash';
import "./index.scss"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../../actions/Action";

class List extends Component {

    constructor(props) {
        super(props);
        const {Actions} = props;
        this.throttle = _.throttle(Actions.concatData, 1000);
        this.debounce = _.debounce(this.makeStateToReorder, 300);
    }


    state = {
        needReorder : false,
        loaded : {}
    };


    //유저가 스크롤 했을 때 새로운 데이터 호출
    scrollEvent = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight && document.body.scrollHeight !== document.body.offsetHeight) {
            this.throttle();
        }
    }

    makeStateToReorder = () => {
        this.setState({
            needReorder : true
        })
    }


    //유저가 창크기 조절했을 때 사이즈 재조정

    // Grid display로 아이템 배치 시도했지만 에러 발견 후 폐기.

    // reorder = () => {
    //     const dogs = document.querySelectorAll('.content');
    //     const {loaded} = this.state;
    //     const {dogData} = this.props;
    //     const check = dogData.every((dog,index) => {
    //         return loaded[`image${index}`] === 'load'
    //     });
    //     if(check) {
    //         for(let i=0; i< dogData.length; i++){
    //             const component = document.getElementsByClassName('dogItem')[i];
    //             if(!component.style.gridRowEnd){
    //                 const rowHeight = 0;
    //                 const rowGap = 10;
    //                 const height = dogs[i].getBoundingClientRect().height;
    //                 const newSpan = Math.ceil((height+rowGap) / (rowGap + rowHeight));
    //                 component.style.gridRowEnd = `span  ${newSpan}`;
    //             }
    //         }
    //
    //         this.setState({needReorder : false})
    //     }
    // };

    //요청된 UI에 맞게 각 아이템에 스타일 부여
    reorder = () => {
        const dogs = document.querySelectorAll('.dogItem');
        const {loaded} = this.state;
        const {dogData} = this.props;
        const temp = [0,0,0,0];
        const left = ['0%', '25%', '50%', '75%'];

        //이미지가 모두 로딩되지 않았으면 false리턴
        const check = dogData.every((dog,index) => {
            return loaded[`image${index}`] === 'load'
        });
        if(check) {
            for(let i=0; i<dogData.length; i++){
                const dog = dogs[i]
                const location = temp.findIndex(item => item === Math.min.apply(null, temp));
                const height = dogs[i].getBoundingClientRect().height;
                dog.style.left = left[location];
                dog.style.top = `${temp[location]}px`;
                dog.style.position = 'absolute';
                temp[location] += height + 10
            }
            this.setState({needReorder : false})
        }
    }

    //이벤트 부여
    componentDidMount = () => {
        window.addEventListener('resize', this.debounce);
        window.addEventListener('scroll', this.scrollEvent)
    };

    componentDidUpdate = (prevProps, prevState) => {
        //dogData값이 변동되었을 때 재배치
        if(JSON.stringify(prevProps.dogData) !== JSON.stringify(this.props.dogData)){
            this.setState({
                needReorder : true
            })
        }

        //needReorder값이 true인 동안은 계속 재배치 시도
        if(this.state.needReorder){
            this.reorder()
        }

    };

    //이벤트 제거
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.debounce);
        window.removeEventListener('scroll', this.scrollEvent)
    }

    render() {
        const {dogData} = this.props;
        const {loaded} = this.state;
        return (
            <div className="list">
                {
                    dogData.map((src, index) => {
                        return (
                            <div className="dogItem" key={`${src}_${index}`}>
                                <div className="content">
                                <img
                                    src={src}
                                    alt={`dog_${index}`}
                                    onLoad={() => {
                                        this.setState({
                                            loaded : {
                                                [`image${index}`] : 'load',
                                                ...loaded
                                            }
                                        })
                                    }}
                                    onError={() => {
                                        this.setState({
                                            loaded : {
                                                [`image${index}`] : 'load',
                                                ...loaded
                                            }
                                        })
                                    }}
                                />
                                {index}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        dogData: state.dogData,
    }),
    (dispatch) => ({
        Actions: bindActionCreators(Actions, dispatch),
    })
)(List);
