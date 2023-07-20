import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface ITourPackage extends Document {
  name : string
  date: string
  description : string
  tag : string
  imgSource : string
  slug : string
}

const TourPackageSchema: Schema = new Schema({
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

export const TourPackage  = (mongoose.models.TourPackage ||
  model('TourPackage', TourPackageSchema)) as Model<ITourPackage>
