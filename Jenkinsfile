pipeline {

agent { 
		docker { image 'node:alpine'}
	}
stages {
	 stage('Build') {
	  steps {
	   echo 'Building.'
		sh 'npm install'
	   	sh 'npm --version'
	   	sh 'git clone https://github.com/KamilaNowak/messaging-app-for-docker'
	   	sh 'docker-compose up -d'	
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
	   	sh "chmod +x -R ${env.WORKSPACE}"
	   	sh './tests.sh'
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
    }
}

def sendEmailAfter(status){
 	echo status
            emailext attachLog: true,
                body: status,
                recipientProviders: [developers(), requestor()],
                to: 'knowak242@gmail.com',
                subject: "Jenkins stage status"
}

