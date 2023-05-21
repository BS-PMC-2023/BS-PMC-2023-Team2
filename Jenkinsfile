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
                dir('storage-app') {
                    sh 'ls'
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
             steps {
                dir('storage-app') {
                    sh 'ls'
                    sh 'npm test -- --coverage'
                }
            }
        }
        stage('Build and Deploy') {
//             when {
//                 branch 'master'
//             }
            steps {
                  dir('storage-app') {
                    sh 'ls'
                    sh 'export CI=false'
                    sh 'npm run build'
                }
            }
        }
    }
}
