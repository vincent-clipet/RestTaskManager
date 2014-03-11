#!/bin/bash

curl -i -X POST -d name="Factorisation du code" -d author="user1" -d desc="Factoriser le code" http://localhost:3000/task
curl -i -X POST -d name="Aide utilisateur" -d author="admin" -d desc="Ajouter une commande d'aide" http://localhost:3000/task
curl -i -X POST -d name="tache1" -d author="user2" http://localhost:3000/task
curl -i -X POST -d name="tache2" -d author="user2" -d worker="John Doe" http://localhost:3000/task
curl -i -X POST -d name="tache3" -d author="user1" -d worker="John Doe" http://localhost:3000/task

curl -i -X GET http://localhost:3000/get_id/1
curl -i -X GET http://localhost:3000/get_id/2

curl -i -X PUT -d worker="John Doe" http://localhost:3000/task/1/set_worker
curl -i -X PUT -d status="Terminé" http://localhost:3000/task/1/set_status
curl -i -X PUT -d desc="Factoriser le code des méthodes de modification de tâches" http://localhost:3000/task/1/set_desc
curl -i -X GET http://localhost:3000/get_name/Factorisation%20du%20code

curl -i -X GET http://localhost:3000/get_id/4
curl -i -X DELETE http://localhost:3000/task/4
curl -i -X GET http://localhost:3000/get_id/4

curl -i -X GET http://localhost:3000/get_worker/John%20Doe
curl -i -X GET http://localhost:3000/get_status/Libre
curl -i -X GET http://localhost:3000/get_all
