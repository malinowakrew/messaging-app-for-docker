pipeline {  
    environment {
    registry = "malinowakrew/app_server"
    registryCredential = 'dockerhub'
  }  
  agent any  
  stages {
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
  }
}
