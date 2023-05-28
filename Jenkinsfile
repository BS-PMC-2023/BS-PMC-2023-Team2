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
                script {
                    def defect_failures = 14
                    def performed_test_cases = 34
                    
                    def derives_measures = defect_failures / performed_test_cases
                    
                    echo "Number of defect failures: ${defect_failures}"
                    echo "Number of performed test cases: ${performed_test_cases}"
                    echo "Derives Measures: ${derives_measures}"
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
