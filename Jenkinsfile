pipeline {

environment {
 	registry = "malinowakrew/lab7"
 	registryCredential = "dockerhub"
 	dockerImage = ""
 }

agent any
	
stages {
	 stage('Build') {
	  steps {
	   echo 'Building.'
		sh 'eval "$(docker-machine env default)"'
	        sh 'git pull origin master'
                sh 'docker-compose up'
		dockerImage = docker.build registry + ":$BUILD_NUMBER"
		archiveArtifacts artifacts: 'client', fingerprint: true 
		archiveArtifacts artifacts: 'server', fingerprint: true 
	   }
	   post {
		failure {
		   	sendEmailAfter('Build failed')
        	}
       	 	success {
           		sendEmailAfter('Build successful')
       	 }
   	    }
	}
	  stage('Test') {
	   steps {
	  	echo 'Testing stage.'
	   	sh 'code/wait.sh server:1234 -- echo READY && node code/client.js'
	   }
	   post {
        	 failure {
          		sendEmailAfter('Tests failed')
        	}
        	success {
            		sendEmailAfter('Tests successful')
       	 }
   	    }
	}
	stage('Deploy'){
		steps{
			docker.withRegistry( "", registryCredential ) {
 			dockerImage.push()
 			dockerImage.push("latest")
		}
	}
    }
}
}

def sendEmailAfter(status){
 	echo status
            emailext attachLog: true,
                body: status,
                recipientProviders: [developers(), requestor()],
                to: 'ed.mroz.11@gmail.com',
                subject: "Jenkins stage status"
}