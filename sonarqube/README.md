<h1 align="center">Welcome to SonarQube Setup 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-v1.0-blue.svg?cacheSeconds=2592000" />
</p>

> Docker compose file for setting up SonarQube community edition with custom Postgres database & merge request analysis plugin

## Install

```sh
docker-compose up -d
```

## Configuration
- Navigate to `locahost:9000` or your domain for sonarqube hosting for web UI
- Go to `Administration` and click on `General`
  - Find `Server base URL`
  - Put the URL of your hosting there e.g `https://2d0e-61-6-81-126.ngrok-free.app` without the ending `/` or `/sonar`
- Navigate to `Gitlab -> Access Tokens`
  - Give the token a proper name & expiration date
  - Check the `api` checkbox
  - Click on `Create personal access token`
  - Copy the access token & keep it as its one time display & we will need that in later steps
- Navigate back to sonarqube web UI
  - Navigate to `Administration -> DevOps Platform Integration -> GitLab`
  - Give a proper name to `Configuration name`
  - Put your `Gitlab` instance url `https://git.lizard.global/api/v4`
  - Paste the `personal access token` in text area `Personal Access token`
  - Save configuration
- (Optional) Navigate to `GitLab -> Preferences -> Applications`
- Give the app a proper name
- Put the redirect URL as `<HOSTING_URL>/oauth2/callback/gitlab`
- Uncheck `Confidential`
  - We are unchecking this checkbox because its recommended by SonarQube for React Apps and SonarQube UI is based on React
- Check the following checkboxes
  - `api`
  - `read_user`
  - `openid` - (if you don't use openID then leave this unchecked)
- Save application & you will get `application key & secret` keep these values we will need it in the next step
- Navigate to `Administration -> Authentication -> GitLab`
- Update the following fields
  - `Enabled` - enable this field
  - `GitLab URL` - use this url ```https://git.lizard.global```
  - `Application ID` - paste the application ID we got in previous step
  - `Secret` - paste the application secret ID we got in previous step
  - `Syncronize user groups` - enable this field

... **to be continued**

## Merge request analysis configs
Copy the file `sonarqube-community-branch-plugin-1.16.1-SNAPSHOT.jar` to `<CONTAINER_NAME>:/opt/sonarqube/extensions/plugins` for example the command should be 

```sh
 docker cp sonarqube-community-branch-plugin-1.16.1-SNAPSHOT.jar sonarqube-sonarqube-1:/opt/sonarqube/extensions/plugins
 ```
  In the container open the file `/opt/sonarqube/conf/sonar.properties` and paste the following two line and replace this `${version}` with actual package version
  ```sh
    sonar.web.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-${version}.jar=web
    sonar.ce.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-${version}.jar=ce
  ```
  in this case it would be 
  ```sh
    sonar.web.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.16.1-SNAPSHOT.jar=web
    sonar.ce.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.16.1-SNAPSHOT.jar=ce
  ```
Save the file & restart your container `docker-compose restart <CONTAINER_NAME>` e.g `docker-compose restart sonarqube-sonarqube-1`

## Author

👤 **Arif Khan**

* Github: [@khanprog](https://github.com/khanprog)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_