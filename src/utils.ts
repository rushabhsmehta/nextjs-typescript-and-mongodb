import { connect, connection } from 'mongoose'
const {
  // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = 'mongodb+srv://mehtarushabh2310:DIJphYGKs18dv23l@cluster0.coqtk4c.mongodb.net/packagemaster?retryWrites=true&w=majority'
} = process.env



const options: any = {
  useUnifiedTopology: true,

  useNewUrlParser: true
}

export const connectToDatabase = async () => {
  if (!connection.readyState) {
    console.log('Connecting to ', MONGO_URI)
    connect(MONGO_URI, options)
  }
}
