import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface ILocation extends Document {
  name : string
  date: string
  description : string
  tag : string
  imgSource : string
  slug : string
}

const LocationSchema: Schema = new Schema({
  name : {
    type: String
  },
  date: {
    type: String
  },
  description : {
    type: String
  },
  tag : {
    type: String
  },
  imgSource : {
    type : String
  },
  
  slug : {
    type : String
  }
})

export const Location  = (mongoose.models.Location ||
  model('Location', LocationSchema)) as Model<ILocation>
