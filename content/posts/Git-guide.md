---
title: "Git Guide"
subtitle: "tldr:All you need to not feel overwhelmed while you encounter git"
date: "2023-11-05"
---
# Detailed explanation of commonly used Git commands

## Configuration

### Configure User Information

Set your name and email address that will be associated with your Git commits:

```shell
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

- `git config` is used to set configuration options in Git.
- `--global` flag sets the configuration globally for your user.

## Creating a Repository

### Initialize a New Repository

Create a new Git repository in the current directory:

```shell
git init
```

- `git init` initializes a new Git repository in the current directory, creating a `.git` subdirectory that stores Git configuration and version history.

## Making Changes

### Add Changes to Staging

Add modified files to the staging area, preparing them for the next commit:

```shell
git add <file>
```

- `git add` stages changes for the next commit. You can specify individual files or directories.

### Commit Changes

Create a commit with staged changes:

```shell
git commit -m "Your commit message"
```

- `git commit` creates a new commit with the changes that are in the staging area.
- The `-m` flag is used to provide a commit message that briefly describes the changes.

## Viewing Status and History

### Check Status

View the status of your working directory:

```shell
git status
```

- `git status` provides information about changes in your working directory and the staging area.

### View Commit History

Display commit history:

```shell
git log
```

- `git log` shows a chronological list of commits in the repository, including commit messages, authors, and commit hashes.

## Branching and Merging

### Create a New Branch

Create a new branch based on the current branch:

```shell
git branch <branchname>
```

- `git branch` is used to create a new branch.
- Specify the branch name to create a new branch.

### Switch Branch

Switch to a different branch:

```shell
git checkout <branchname>
```

- `git checkout` allows you to switch between branches.
- Specify the branch name to switch to that branch.

### Merge Branch

Merge changes from one branch into the current branch:

```shell
git merge <branchname>
```

- `git merge` combines changes from the specified branch into the current branch, creating a new commit with the merged changes.

### Delete Branch

Delete a branch:

```shell
git branch -d <branchname>
```

- `git branch -d` is used to delete a branch that is no longer needed. Use `-d` to delete a branch if it has been fully merged into other branches.

## Remote Repositories

### Add a Remote

Add a remote repository to your Git configuration:

```shell
git remote add origin <remote-url>
```

- `git remote` is used to manage remote repositories.
- `add` specifies that you want to add a remote.
- `origin` is the commonly used name for the remote, but you can choose a different name.
- `<remote-url>` is the URL of the remote repository.

### Fetch Changes

Fetch changes from a remote repository:

```shell
git fetch
```

- `git fetch` downloads objects and references from another repository, updating your remote-tracking branches without modifying your working directory.

### Push Changes

Push local changes to a remote repository:

```shell
git push origin <branchname>
```

- `git push` sends your local changes to a remote repository.
- `origin` is the name of the remote repository.
- `<branchname>` specifies the branch you want to push.

### Pull Changes

Pull changes from a remote repository and merge them into your local branch:

```shell
git pull
```

- `git pull` combines `git fetch` and `git merge` to update your local branch with changes from a remote repository.

## Collaborating

### Clone a Repository

Clone a remote repository to your local machine:

```shell
git clone <repository-url>
```

- `git clone` creates a local copy of a remote repository on your computer.

### Fork a Repository

Fork a repository on a platform like GitHub to create your own copy. This is not a Git command but a common step when contributing to open-source projects.

### Create a Pull Request

Create a pull request to propose changes to the original repository. This is done on platforms like GitHub and GitLab, not through Git commands.

### Review and Merge

Review pull requests and merge changes in a collaborative environment. This also happens on platforms like GitHub and GitLab, not through Git commands.

## Miscellaneous

### Ignore Files

Create a `.gitignore` file to specify which files or directories should be ignored by Git. You can list file patterns, directories, or file extensions that Git should not track.

### View Differences

View the differences between files in your working directory and the most recent commit:

```shell
git diff
```

- `git diff` shows the differences between your working directory and the last committed state.

### Help

Get help on a specific Git command:

```shell
git --help <command>
```

- Use `git --help` followed by the command name to get detailed information about a specific Git command.

This detailed explanation covers commonly used Git commands for version control. For more in-depth documentation, you can refer to the Git documentation
