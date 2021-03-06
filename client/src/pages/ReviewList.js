import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import ReviewListItem from './../components/ReviewList/ReviewListItem';
import API from './../utils/API';

class ReviewList extends Component {

    componentDidMount() {
        const goal = window
            .location
            .pathname
            .split("/");
        const idFromURL = goal[goal.length - 1];
        console.log(idFromURL);
        API
            .getCountryReviews(idFromURL)
            .then(result => this.setState({reviews: result.data}));
    }

    state = {
        reviews: []
    }

    render() {
        console.log(this.state);
        return (
            <Fragment>

                <main className="container">
                    {this
                        .state
                        .reviews
                        .map(((listItem, i) => (<ReviewListItem data ={listItem} key={i}/>)))}

                </main>
            </Fragment>
        )
    }
}

export default ReviewList