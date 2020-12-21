import React from 'react'
import './CurrentTrack.css'

class CurrentTrack extends React.Component {
    render() {
        return (
            <div className="Current-Track">
                <div className="Album-image" >
                    <div className={`Image ${!this.props.playing ? 'hidden' : ''}`}>
                        <img src={this.props.albumImage}/>
                    </div>
                </div>
                <div className="Navigation-Menu">
                </div>
            </div>
        );
    }
}
export default CurrentTrack