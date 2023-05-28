pipeline {
    agent {
        docker {
            image 'node:16-alpine'
        }
    }
    stages {
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
                echo 'Check in SPMP'
            }
        }
        stage('System Usability Scale') {
             steps {
                echo 'Check in SPMP'
            }
        }
        stage('Build and Deploy') {
            steps {
                  dir('storage-app') {
                    sh 'ls'
                    sh 'CI=false npm run build'
                }
            }
        }
    }
}
