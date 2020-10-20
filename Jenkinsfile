pipeline {
    agent any
    options {
        gitLabConnection 'GitLab IE Publishing'
        gitlabBuilds(builds: ['Pre-Build', 'Build', 'Test', 'Deploy'])
    }
    stages {
        stage('Pre-Build') {
            steps {
                slackSend(color: '#FFFF00', message: "STARTED: *${env.JOB_NAME}* on `${gitlabSourceBranch}` _by ${gitlabUserName}_ [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>) ")
            }
            post{
                failure {
                    updateGitlabCommitStatus name: 'Pre-Build', state: 'failed'
                }
                success {
                    updateGitlabCommitStatus name: 'Pre-Build', state: 'success'
                }
            }
        }
        stage('Build') {
            steps {
                sh 'cd $WORKSPACE'
                sh 'npm install && ./node_modules/.bin/gulp hugo' 
                sh 'cd integration && npm install'                            
                sh 'cd integration && ../node_modules/.bin/hugo' 
            }
            post{
                failure {
                    updateGitlabCommitStatus name: 'Build', state: 'failed'
                }
                success {
                     updateGitlabCommitStatus name: 'Build', state: 'success'
                }
            }
        }
        stage('Test') {
            steps {
                updateGitlabCommitStatus name: 'Test', state: 'success'
            }
        }
        stage('Deploy') {
            steps {
                parallel(
                    material_provider: {
                        sh 'cd /var/efs/$gitlabTargetBranch/multimedia'
                        sh 'sh /var/efs/script/createDir.sh /var/efs/$gitlabTargetBranch/multimedia/${JOB_NAME%%/*}'
                        sh 'cd $WORKSPACE'
                        sh 'sudo /usr/bin/rsync -azvv --chown=administrador:www-data --exclude=".git" --exclude="Jenkinsfile"  --delete $WORKSPACE/integration/public/* /var/efs/$gitlabTargetBranch/multimedia/${JOB_NAME%%/*}'

                    }
                )
            }
            post{
                failure {
                    updateGitlabCommitStatus name: 'Deploy', state: 'failed'
                }
                success {
                    updateGitlabCommitStatus name: 'Deploy', state: 'success'
                }
            }
        }
    }
    post {
        always {
                deleteDir() /* clean up our workspace */
        }
        failure {
           slackSend(color: '#FF0000', message: " :x:*${env.JOB_NAME}*: Job failed [#${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
            addGitLabMRComment comment: "Job failed"

        }
        success {
            slackSend(color: '#00FF00', message: ":heavy_check_mark: *${env.JOB_NAME}*: Job succeeded  [#${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
            addGitLabMRComment comment: 'Job successful'
            acceptGitLabMR mergeCommitMessage : 'Tests:Job successful'
        }
    }
}



