pipeline {

agent any
	
stages {
	 stage('Build') {
	  steps {
	   echo 'Building.'
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
        mail to: 'ed.mroz.11@gmail.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
    }
    success {
            echo 'I succeeded :D'
    }
}
	  }

