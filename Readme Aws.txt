AWS

First:

	The create key pare for encrypting the message with the aws

	key pair name:goaction

Second:

	Make the launching our EC2 instance with  Bitnami MEAN image

	MOngoDb username: root
	pwd:

#########################################################################
#                                                                       #
#        Setting Bitnami application password to 'UMu6tmGZNnTh'         #
#                                                                       #
#########################################################################


######MONGODB USERS#############
####root/ admin/ and remote

{user: 'jony',
pwd:"dadei22",
 roles: [ "root" ]}

####Usuario de prueba aws GO db
{
user:kandy
pwd:dami33
roles:[
                {
                        "role" : "readWrite",
                        "db": "Go"
                }
        ]
}


Third: Install putty ssh

concet to de public dns of aws with ssh
introduce de preivate key I generete with puttygen

Branch master set up to track remote branch master from origin.
To https://github.com/Joroman/goActionWebClient.git
 * [new branch]      master -> master
