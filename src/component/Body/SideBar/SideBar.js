/* */
import React from 'react'
import propTypes from 'prop-types'

/* */
import styles from './SideBar.scss'
import Directory from './Directory'

class SideBar extends React.Component {
    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
           <div className={styles.wrapper}>
               <Directory
                   directory={this.props.directory}
                   currentFileName={this.props.currentFileName}
                   handleDoubleClick={this.props.handleDoubleClick} />
           </div>
        )
    }
}

SideBar.propTypes = {
    handleDoubleClick: propTypes.func,
}

SideBar.defaultProps = {
    handleDoubleClick: () => {},
}

export default SideBar
