import React from'react';
import './Track.css';

class Track extends React.Component {
    /* renderAction(){
       if(isRemoval = true){
        <button className="Track-action">-</button>
       } 
       else{
        <button className="Track-action">+</button> 
       }
    }
    */

    render(){

        const { track } = this.props;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                <button className="Track-action">{/*<!-- + or - will go here -->*/}</button>
            </div>
        );
    }
}

export default Track;