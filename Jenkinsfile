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
                sh "uname"
                sh "apt-get update"
//                 sh "apt-get install nodejs"
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

