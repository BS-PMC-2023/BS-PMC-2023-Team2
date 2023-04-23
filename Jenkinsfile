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
    agent {
        docker {
            image 'node:16-alpine'
        }
    }
    stages {
        // stage('Checkout') {
        //     steps {
        //         checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/yourusername/your-nodejs-project.git']]])
        //     }
        // }
        stage('Install Dependencies') {            
            steps {
                sh 'cd server'
                 sh 'npm install'
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

