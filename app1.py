import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


# engine = create_engine("sqlite:///titanic.sqlite")
rds_connection_string = "postgres:postgres@localhost:5432/postgres"
engine = create_engine(f'postgresql://{rds_connection_string}')



# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
vote= Base.classes.vote
trends=Base.classes.trends


app = Flask(__name__)




@app.route("/api/v1.0/trends")
def trends_api():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(
        trends.region,	
        trends.cnn,
        trends.fox_news,
        trends.year).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_trends = []
    for region,cnn,fox_news,year in results:
        trends_dict = {}
        trends_dict["region"] = region
        trends_dict["cnnn"] = cnn
        trends_dict["fox_news"] = fox_news
        trends_dict["year"] = year
        all_trends.append(trends_dict)

    return jsonify(all_trends)


@app.route("/api/v1.0/vote")
def vote_api():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(vote.state,
        vote.voted_in_person,vote.in_person_on_election_day,
        vote.in_person_before_election_day,vote.voted_by_mail_or_absentee_ballot_my_mail).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_vote = []
    for state, voted_in_person,	in_person_on_election_day,in_person_before_election_day,voted_by_mail_or_absentee_ballot_my_mail in results:
        vote_dict = {}
        vote_dict["state"] = state
        vote_dict["voted_in_person"] = voted_in_person
        vote_dict["in_person_on_election_day"] = in_person_on_election_day
        vote_dict["in_person_before_election_day"] = in_person_before_election_day
        vote_dict["voted_by_mail_or_absentee_ballot_my_mail"] = voted_by_mail_or_absentee_ballot_my_mail
        all_vote.append(vote_dict)

    return jsonify(all_vote)


if __name__ == '__main__':
    app.run(debug=True)
