# absence-note  
Online absence note system  

Brought to you by:  
###TeaTime  
Leon Chou  
Johnny So  
Roy Xu  
Kevin Yan  

# Deployment Guide
1. Run "sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10"
2. Run "echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list"
3. Run "sudo apt-get update"
4. Run "sudo apt-get install -y mongodb-org"
5. Run "curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -"
6. Run "sudo apt-get install -y nodejs"
7. Run "sudo apt-get install git"
8. Run "npm install"
9. Run "npm install forever"
10. Clone the repo and navigate into directory
11. Create a file called ownerstartup.sh
12. Copy and paste the following into the file -things omitted for obvious reasons

    export env=production
    export PORT=80
    export OWNER="Is owner"

    export SECRET= <SECRET KEY>

    export GOOGLE_CLIENT_ID= <GOOGLE CLIENT ID>
    export GOOGLE_CLIENT_SECRET= <GOOGLE CLENT SECRET KEY>

    export GMAIL_USERNAME= <GMAIL USERNAME>
    export GMAIL_PASSWORD= <GMAIL PASSWORD>
    export GMAIL_SENDER="Stuy Absence Note"

    forever ./bin/www

13. Replace the necessary information in the file (secret key, google client id, etc.)
14. Run "chmod +x ownerstartup.sh"
15. Run "npm start"

# Changelog
- May 17
----fixed models error in config & module.js
----added the accounts.js in models directory
----working homepage button
----setting the environment
- May 18
---- GOOGLE AUTH working
- May 19
---- Nothing
- May 20
---- Absence and Student / Teacher / Admin Schemas created
- May 21
---- Frontpage completed
---- Schemas created (Account, Student, Teacher)
- May 22
---- Home Page changed to support google auth
---- Created launch screen for students and admins
---- Created absence note form
---- Absences model finished (schema & add method)
- May 24
---- Finished early excuse note
---- Updated launch screen (rotated square)
- May 25
---- Added method .approve to the AbsenceSchema
- May 26
---- Updated route names and finished new absence form
- May 27
---- Added method .remove to AbsenceSchema
- May 28
---- Updated early excuse form
- May 29
---- Finished creating all possible routes
- June 2
---- Finished history page
