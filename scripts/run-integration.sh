docker-compose up -d
echo "Waiting for the db to connect"
./script/wait-for-it.sh "postgresql://postgres:mypass@localhost:5432/users" --
echo "Connected to the db"
npx prisma migrate dev --name init
npm run test
docker-compose down