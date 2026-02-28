const mongoose = require('mongoose');

const connectDB = async () => {
  try {                                                
    await mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb+srv://krishna:DtVF1AagnHaTEcn2@cluster0.86ly0v3.mongodb.net/smart-city-portal?retryWrites=true&w=majority'
);
mongoose.connection.once("open", () => {
  console.log("Connected DB:", mongoose.connection.name);
});
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;