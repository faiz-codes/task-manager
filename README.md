# TASK MANAGER

This project aims to test the skills and resourcefulness of junior developers at Lizard Global. The goal is to create a simple task manager, TODO app, based on only a case study design found on Dribbble: https://dribbble.com/shots/20166390--29-Mobile-App-Concept

![alt text](https://git.lizard.global/robin/task-manager/-/raw/main/mockup2.webp "Mockup 2")
![alt text](https://git.lizard.global/robin/task-manager/-/raw/main/mockup1.webp "Mockup 1")

The design is limited in screens and it's up to the developer to fill out the blanks in the same style as the provided screens.

## Project Brief

Task Manager is an app that helps tracking and completing tasks with other users. Tasks can be personal or grouped (boards), e.g., shared tasks among the members of your household, colleagues or family.

### Themes
1. Users: Give users a personalized experience in the app.
2. Boards: Make it possible to collaborate on tasks.
3. Tasks: Add and track tasks to get things done.

### Epics
1. The app is for registered users only. Users may only see their own tasks and boards assigned to them. Users can invite other users to join their boards and start assigning tasks to them.
2. Boards help to categorize tasks among users. A board is a group of users, by invitation, and tasks are assigned to all members of the group. Whoever finishes the task first moves it to done. Users can leave a board and start new boards.
3. Users can create tasks and finish them. Tasks have a due date, title, short description.

** Themes and epics are short and limited on purpose. Use the mockups and common sense to fill out the blanks and assume functionality and features. User stories have to be written by yourself, but the focus here is development. 

## Techstack
For any tech, use the current stable releases. If this is not possible, due to dependency mismatches or something else, make a note with the reason.
### Backend
For this project a backend has been provided on the generic micro services architecture of Lizard Global. Common features like user registration and login are present, as well as a User and Task service.
Refer to the backend README on how to run it. Feel free to add functionality where required.

### Frontend
For this exercise you'll work with expo and [Gluestack](https://gluestack.io/). Gluestack-UI is a fully customizable UI library. Find out how theming works and how to create custom components where needed. For more functional components, always try to find a 3rd party solution. Only if not available, create it yourself. Structure your components atomically.

## Other requirements
### Deployment
The backend will not be deployed to a server, but runs locally on your desktop in docker containers. The API gateway is exposed on port 3000.
The mobile app you'll make can be pushed to expo but it's not required. The whole project will be tested locally. 
### The blanks
This exercise has a lot of blanks. You have to work with only 4 designed screens, but the epics require screens for login and registration, adding tasks, creating boards, etc. It's advisable to create a flow chart for this app and start with screens containing only buttons for navigating to the relevant screens as a basis.
If unsure about certain decisions, e.g. which router to use or how to connect to the API, ask. 
Be advised that ChatGPT has a data source cutoff in 2019 for most subjects, so any code produced by the tool is most likely to be outdated. 
### Code management
At Lizard we work strictly according to [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/). For this project, even though you'll work on it alone, it's expected to create proper feature branches, once done and tested, promote the features to the develop branch and on a weekly basis create a release branch. 
### Releases
To make this exercise reflect a real project, build according to an agile scrum approach. For development this means that your weekly releases have to work and contain a minimal (happy) flow. This means very horizontal development. Don't stack features, e.g., start with a perfect login page, then registration, then a task dashboard... Think about the value for testing and acquiring user feedback when you plan features. E.g., skip login by only making a page with a button and hardcoded credentials, then take the most valuable items on the dashboard (task cards?) and groups page (group cards?). Make the first release of the add task/group feature to just add a hard coded task/group. Make the task screen just visual, but don't focus on completing tasks yet. Then in the next release round make everything a bit better until your time (budget) is finished.

## Documentation
Yes, document what you do. There's an empty README file in the app folder.