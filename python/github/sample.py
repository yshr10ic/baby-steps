from github import Github


def main():
    gh = Github(r'username', r'password')

    for repo in gh.get_user().get_repos():
        print(repo)

    repo = gh.get_repo('yshr10ic/deep-learning-from-scratch-2')
    print(repo.stargazers_count)

    for branch in repo.get_branches():
        print(branch)

    repo = gh.get_repo('yshr10ic/baby-steps')
    for commit in repo.get_commits():
        print(commit.files)


if __name__ == "__main__":
    main()
