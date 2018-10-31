import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss';

export class Header extends React.Component {
    renderLoading() {
        const { loading } = this.props;
        if (loading) {
            return (
                <div className="loader" />
            );
        }
        return null;
    }

    render() {
        return (
            <header className="header">
                <Link to="/">Podcaster</Link>

                {this.renderLoading()}
            </header>
        );
    }
}

export function mapStateToProps(state) {
    return {
        loading: state.loadingReducer.loading,
    };
}

export default connect(mapStateToProps)(Header);
