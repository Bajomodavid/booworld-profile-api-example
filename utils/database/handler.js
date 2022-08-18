const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { dbSeeder } = require('./seeds/seeder');

exports.dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  await mongoose.connect(uri, mongooseOpts).then(()=>console.log('connected'))
  .catch(e=>console.log(e));
  await dbSeeder();
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  // await mongoServer.stop();
};