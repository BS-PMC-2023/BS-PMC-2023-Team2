// pipeline {
//    agent any
//    stages {
//       stage('Hello') {
//          steps {
//             echo 'Hello World!'
//          }
//       }
//    }
// }

pipeline {
    agent any
    stages {
        // stage('Checkout') {
        //     steps {
        //         checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/yourusername/your-nodejs-project.git']]])
        //     }
        // }
        stage('Install Dependencies') {            
            steps {
                sh "node -v"
                sh "npm -v"
                sh "uname"
                sh "curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh"
                sh "bash nodesource_setup.sh"
                    
//                sh "apt-get update"
//                 sh "sudo apt-get install nodejs"
//                 sh "apt-get install npm"
//                 sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build and Deploy') {
            when {
                branch 'master'
            }
            steps {
                sh 'npm run build'
            }
        }
    }
}

