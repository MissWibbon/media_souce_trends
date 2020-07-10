drop table president;

CREATE TABLE president (
year VARCHAR(10),	
state VARCHAR(30),	
state_po VARCHAR(30),
state_cen INT,	
state_ic INT,
office VARCHAR(30),
candidate VARCHAR(100),
party VARCHAR(30),	
writein	VARCHAR(30),
candidatevotes INT,
totalvotes INT
);


SELECT * FROM president;


create TABLE vote(
State VARCHAR(30) ,	
Voted_in_person float,
In_person_on_Election_Day float,
In_person_before_Election_Day float,
Voted_by_mail_or_absentee_ballot_my_mail float
);

SELECT * FROM vote;

ALTER TABLE vote
ADD COLUMN id SERIAL PRIMARY KEY;


create TABLE trends(
Region VARCHAR(30),	
CNN float,	
Fox_News float,
Year VARCHAR(10)
);


ALTER TABLE trends
ADD COLUMN id SERIAL PRIMARY KEY;


SELECT * FROM trends;

