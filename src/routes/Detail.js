import React from "react";
import "./Detail.css";

class Detail extends React.Component{
    componentDidMount(){
        const {location, history} = this.props;
        if (location.state === undefined ){
            history.push("/")
        }
    }
    render(){
        const { location } = this.props;
        if(location.state){
            return <div className="container">
                <div className="detail-container"> 
                <h3>{location.state.title}</h3>
                <img src={location.state.poster} alt={location.state.title}></img>
                <p>rating : {location.state.rating} / 10.0 </p>
                <p>{location.state.summary }</p>
                </div>
            </div>
        }
        else{
            return null;
        }
    }
}
export default Detail;
