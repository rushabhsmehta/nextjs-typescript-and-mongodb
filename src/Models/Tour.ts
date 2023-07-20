import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface ITour extends Document {
  name : string
  date: string
  description : string
  tag : string
  imgSource : string
  slug : string
}

const TourSchema: Schema = new Schema({
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

export const Tour  = (mongoose.models.Tour ||
  model('Tour', TourSchema)) as Model<ITour>