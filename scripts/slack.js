import fetch from 'node-fetch';

/**
 * Fetch private leaderboard data from Advent of Code.
 * @returns {Promise<unknown>} - Leaderboard data.
 */
async function getPrivateLeaderboard() {
  const year = new Date().getFullYear();
  const url = `https://adventofcode.com/${year}/leaderboard/private/view/674817.json`;
  // To get this session cookie, visit the url above and inspect the request in the network tab. Copy the value of the Cookie header.
  const sessionCookie =
    '_ga=GA1.2.1991867695.1732742972; _gid=GA1.2.996704835.1732742972; session=53616c7465645f5fe72550b2ebe70449bac670c43e58a983bc8fc3a08b543f863a6d993c2c4c44db0415642d2a7c53f05528cf13fe03f681b4932ced7b2a7823; _ga_MHSNPJKWC7=GS1.2.1732742972.1.1.1732743055.0.0.0';

  try {
    const response = await fetch(
      url,
      {
        headers: {
          Cookie: `session=${sessionCookie}`,
        }
      },
    );

    if (response.ok) {
      const leaderboardData = await response.json();
      return leaderboardData;
    } else {
      console.error(`Failed to fetch leaderboard data. Status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return null;
  }
}

/**
 * Format Advent of Code leaderboard data into the shape the slack webhook expects.
 */
function formatData(data) {
  console.log('data', JSON.stringify(data, null, 2));
  // ${place}) ${score} ${starCount} ${name}
  // 1) 900 *** brentguistwite
  const members = Object.values(data.members).sort((a, b) => b.local_score - a.local_score);
  const obj = {
    firstPlace: members[0].name,
    firstScore: members[0].local_score,
    firstStars: members[0].stars,
    secondPlace: members[1].name,
    secondScore: members[1].local_score,
    secondStars: members[1].stars,
    thirdPlace: members[2].name,
    thirdScore: members[2].local_score,
    thirdStars: members[2].stars,
    date: new Date().getDate(),
  };

  return obj;
}

/**
 * Post Advent of Code leaderboard data to Slack workflow.
 */
async function postToSlack(data) {
  // DONT CHANGE THIS URL
  const slackWebhookURL = 'https://hooks.slack.com/triggers/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';

  try {
    const response = await fetch(slackWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Failed to send message to Slack. Status code: ${response.status}`);
    } else {
      console.log('SUCCESSFULLY POSTED TO SLACK');
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error);
  }
}

const fakeData = {
  "members": {
    "191848": {
      "id": 191848,
      "completion_day_level": {
        "1": {
          "1": {
            "star_index": 100111,
            "get_star_ts": 1701435884
          },
          "2": {
            "star_index": 108601,
            "get_star_ts": 1701438283
          }
        }
      },
      "last_star_ts": 1701438283,
      "local_score": 3,
      "stars": 2,
      "name": "Michael Vessia",
      "global_score": 0
    },


    "674817": {
      "completion_day_level": {
        "1": {
          "1": {
            "star_index": 0,
            "get_star_ts": 1701407725
          },
          "2": {
            "star_index": 19016,
            "get_star_ts": 1701412572
          }
        }
      },
      "id": 674817,
      "global_score": 0,
      "name": "brentguistwite",
      "stars": 2,
      "local_score": 8,
      "last_star_ts": 1701412572
    },


    "987806": {
      "last_star_ts": 1701420402,
      "stars": 1,
      "local_score": 2,
      "name": "Jordan Garrison",
      "global_score": 0,
      "id": 987806,
      "completion_day_level": {
        "1": {
          "1": {
            "get_star_ts": 1701420402,
            "star_index": 44159
          }
        }
      }
    },


    "2312852": {
      "id": 2312852,
      "completion_day_level": {
        "1": {
          "1": {
            "star_index": 30878,
            "get_star_ts": 1701416623
          },
          "2": {
            "get_star_ts": 1701420776,
            "star_index": 45604
          }
        }
      },
      "last_star_ts": 1701420776,
      "stars": 2,
      "name": "Austin See",
      "local_score": 6,
      "global_score": 0
    }
  },
  "event": "2023",
  "owner_id": 674817
}

// Kick it all off
getPrivateLeaderboard()
    .then(leaderboardData => {
        if (!leaderboardData) {
            throw new Error('Failed to retrieve leaderboard data.');
        }

        return formatData(leaderboardData);
    })
    .then(postToSlack)
    .catch(err => console.error(err));
