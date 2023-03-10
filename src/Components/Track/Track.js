import React from "react";
import './Track.css'

export class Track extends React.Component {
    constructor(props){
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }
    renderAction(){
        return this.props.isRemoval ? '-' : '+';
    }

    addTrack(){
        this.props.onAdd(this.props.track)
    }

    removeTrack(){
        this.props.onRemove(this.props.track)
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>
                        {/* track name will go here */}
                        {this.props.track.name}
                    </h3>
                    <p>
                        {/* track artist will go here | track album will go here */}
                        {this.props.track.artist + ' | ' + this.props.track.album}
                    </p>
                </div>
                <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack: this.addTrack}>
                    {/* + or - will go here */}
                    {this.renderAction()}
                </button>
            </div>
        )
    }
}