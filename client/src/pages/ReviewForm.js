import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";
import API from "../utils/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Rating} from 'semantic-ui-react';

class ReviewForm extends Component {
    state = {
        formSubmitted: false,
        review: "",
        user: "",
        displayName: "",
        img: "",
        program: "",
        country: "",
        countryCode: "",
        dateStart: "",
        dateEnd: "",
        rating: ""

    }

    onChange = e => {

        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state.review)
    };

    handleRate = (e, {rating, maxRating}) => this.setState({rating, maxRating})

    onLogoutClick = e => {
        e.preventDefault();
        this
            .props
            .logoutUser();
    };

    handleChangeStartDate = date => {
        this.setState({dateStart: date});
    }
    handleChangeEndDate = date => {
        this.setState({dateEnd: date});
    }

    handleFormSubmit = (user) => {
        //thanks!
        this.setState({formSubmitted: true})

        //IF ALL FIELDS ARE TRUE SEND DATA

        console.log(user.id, this.state.review)

        //Validation user.preventDefault();

        API
            .grabCountryCode(this.state.country)
            .then((res) => {
                const query = {
                    userId: user.id,
                    review: this.state.review,
                    displayName: this.state.displayName,
                    img: this.state.img,
                    program: this.state.program,
                    country: this.state.country,
                    countryCode: res.data,
                    dateStart: this.state.dateStart,
                    dateEnd: this.state.dateEnd,
                    rating: this.state.rating
                }
                API
                    .createReview(query)
                    .then((res) => {
                        console.log("res", res)
                        window.location.href = "./map"
                    })

            })

    }

    //userCheck = user

    render() {
        const {user} = this.props.auth;
        // console.log("user", user) .setState({ user: user })
        return (
            <div className="container z-depth-1 card form__view row">
                {/* <form> */}

                {/* displayName */}
                {/* if displayName is submitted && unfilled we show a message*/}

                {/* else we render normal page */}
                <div className="input-field col s12">

                    <input
                        onChange={this.onChange}
                        value={this.state.displayName}
                        id="displayName"
                        type="text"/> {this.state.formSubmitted && !this.state.displayName
                        ? (
                            <label htmlFor="text">Name ***Required to Submit***</label>
                        )
                        : (
                            <label htmlFor="text">Name</label>
                        )}

                </div>

                <div className="input-field col s12">

                    <input onChange={this.onChange} value={this.state.img} id="img" type="text"/>
                    <label htmlFor="text">Image URL</label>
                </div>
                <div className="input-field col s12">

                    <input
                        onChange={this.onChange}
                        value={this.state.program}
                        id="program"
                        type="text"/> {this.state.formSubmitted && !this.state.program
                        ? (
                            <label htmlFor="text">Name of Program ***Required to Submit***</label>
                        )
                        : (
                            <label htmlFor="text">Name of Program</label>
                        )}
                </div>
                <div className="input-field col s12">

                    <input
                        onChange={this.onChange}
                        value={this.state.tripOrg}
                        id="tripOrg"
                        type="text"/> {this.state.formSubmitted && !this.state.tripOrg
                        ? (
                            <label htmlFor="text">Who was the trip organizer? ***Required to Submit***</label>
                        )
                        : (
                            <label htmlFor="text">Who was the trip organizer?</label>
                        )}
                </div>
                <div className="input-field col s12">

                    <input
                        onChange={this.onChange}
                        value={this.state.country}
                        id="country"
                        type="text"/> {this.state.formSubmitted && !this.state.country
                        ? (
                            <label htmlFor="text">What Country Did You Study In? ***Required to Submit***</label>
                        )
                        : (
                            <label htmlFor="text">What Country Did You Study In?</label>
                        )}
                </div>

                <div className="input-field col s12">

                    <DatePicker
                        selected={this.state.dateStart}
                        value={this.state.dateStart}
                        onChange={this.handleChangeStartDate}
                        id="dateStart"
                        type="date"/> {this.state.formSubmitted && !this.state.dateStart
                        ? (
                            <span className="helper-text">Start Date ***Required to Submit***</span>

                        )
                        : (
                            <span className="helper-text">Start Date
                            </span>
                        )}
                </div>
                <div className="input-field col s12">

                    <DatePicker
                        selected={this.state.dateEnd}
                        value={this.state.dateEnd}
                        onChange={this.handleChangeEndDate}
                        id="dateEnd"
                        type="date"/> {this.state.formSubmitted && !this.state.dateEnd
                        ? (
                            <span className="helper-text">End Date ***Required to Submit***</span>

                        )
                        : (
                            <span className="helper-text">End Date
                            </span>
                        )}
                </div>

                <div className="input-field col s12">

                    <span className="helper-text" id="rating">How would you rate your experience?
                    </span>
                    <Rating maxRating={5} onRate={this.handleRate}/> {/* <pre>{JSON.stringify()}</pre> */}

                </div>

                <div className="input-field col s12">

                    <textarea
                        onChange={this.onChange}
                        value={this.state.review}
                        id="review"
                        type="text"
                        className="materialize-textarea"></textarea>

                    {this.state.formSubmitted && !this.state.country
                        ? (
                            <label htmlFor="text">Write a Review of your Trip (1-4 Paragraphs) ***Required to Submit***</label>
                        )
                        : (
                            <label htmlFor="text">Write a Review of your Trip (1-4 Paragraphs)</label>
                        )}

                </div>

                <button
                    style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                    type="submit"
                    onClick={() => this.handleFormSubmit(user)}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3 center-block">
                    Submit
                </button>
                {/* </form> */}
            </div >
        )

    }
}

ReviewForm.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, {logoutUser})(ReviewForm);