import requests
import json


TOKEN = 'da81de7c81736d1e2628f96eeaba1ae81f87b8e0'
ENDPOINT = 'https://api.github.com/graphql'


def post(query):
    headers = {'Authorization': 'bearer ' + TOKEN}
    response = requests.post(ENDPOINT, json=query, headers=headers)

    if response.status_code != 200:
        print('Post fails: {}'.format(response))

    return response.json()


def get_query():
    query = {
        'query': """
        query{
            viewer {
                contributionsCollection(from: "2020-04-03T00:00:00+09:00", to: "2020-04-03T23:59:59+09:00") {
                    totalRepositoryContributions
                    totalCommitContributions
                    commitContributionsByRepository {
                        repository {
                            name
                        }
                        contributions
                        {
                            totalCount
                        }
                    }
                }
            }
        }
        """
    }
    return query


def get_query2():
    query = {
        'query': """
        query{
            viewer {
                repositories(first: 5 orderBy: {field: CREATED_AT, direction: DESC}) {
                    nodes {
                        createdAt
                        isPrivate
                        name
                    }
                    totalCount
                }
            }
        }
        """
    }
    return query


if __name__ == "__main__":
    query = get_query()
    response = post(query)
    print(json.dumps(response, indent=2))
