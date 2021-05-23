pipeline {

environment {
 	registry = "malinowakrew/lab07"
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
		sh 'sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
		sh 'sudo chmod +x /usr/local/bin/docker-compose'
		sh "docker-compose up -d"
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
			script {
			docker.withRegistry( "", registryCredential ) {
 			dockerImage.push()
 			dockerImage.push("latest")}
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