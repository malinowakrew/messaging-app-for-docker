pipeline {

agent any
	
stages {
	 stage('Build') {
	  steps {
	   	echo 'Building stage.'
	        sh 'git pull origin master'
		/* sh 'docker rm node_app_server'
		sh 'docker rm node_app_client' */
		sh 'curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
		sh 'chmod +x /usr/local/bin/docker-compose'
		//sh "docker-compose up -d"
                //sh 'docker-compose up -d'
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
	   	//sh "chmod +x -R ${env.WORKSPACE}"
	   	//sh './tests.sh'
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
	stage('Deploy') {
	   steps {
	  	echo 'Deploy stage.'
		//sh ' docker build -t messaging-app -f docker/Dockerfile-deploy . '
	   }
		  
	   post {
        	 failure {
          		sendEmailAfter('Deploy failed')
        	}
        	success {
            		sendEmailAfter('Deploy successful')
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
                to: 'adamegnon@gmail.com',
                subject: "Jenkins"
}
