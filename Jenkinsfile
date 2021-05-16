pipeline {

agent any
	
stages {
	 stage('Build') {
	  steps {
	   echo 'Building.'
		sh 'eval "$(docker-machine env default)"'
	        sh 'git pull origin master'
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
                to: 'zarczynski.adas@gmail.com',
                subject: "Jenkins stage status"
}

