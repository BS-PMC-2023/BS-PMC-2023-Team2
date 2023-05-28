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
        stage('Run Unit Tests') {
             steps {
                dir('storage-app') {
                    sh 'ls'
                    sh 'npm test'
                }
            }
        }
        stage('Unit Tests Coverage') {
             steps {
                dir('storage-app') {
                    sh 'ls'
                    sh 'npm test -- --coverage'
                }
            }
        }
        stage('Run Integration Tests') {
             steps {
                dir('storage-app') {
                    sh 'ls'
                    sh 'npm test'
                }
            }
        }
        stage('Integration Tests Coverage') {
             steps {
                dir('storage-app') {
                    sh 'ls'
                    sh 'npm test -- --coverage'
                }
            }
        }
        stage('Derived Measures') {
             steps {
                
            }
        }
        stage('System Usability Scale') {
             steps {
                
            }
        }
        stage('Build and Deploy') {
//             when {
//                 branch 'master'
//             }
            steps {
                  dir('storage-app') {
                    sh 'ls'
                    sh 'CI=false npm run build'
                }
            }
        }
    }
}
