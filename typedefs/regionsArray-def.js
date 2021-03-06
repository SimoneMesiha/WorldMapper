const { gql } = require('apollo-server');


const typeDefs = gql `
	type RegionsArray {
		_id: String!
		name: String!
		subregion: [String]!
		capital: String!
        leader: String!
        flag: String!
        landmark:  [String]!
		isitmap: Boolean!
		owner : String
		parent: String
	}
	
	
	extend type Query {
		getAllRegions: [RegionsArray]
		getRegionsArrayById(_id: String!): RegionsArray 
	}
	extend type Mutation {
		  createmap(regionarray : RegionInput): RegionsArray
		  deletemap(_id : String!): Boolean
		  deletesubregion(_id : String! parentId:String!): Boolean
		  addRegion(regionInput: RegionInput!): String
		  updateRegionField(_id: String!, field: String!, value: String!):String
		  updateSubregionField(_id: String!, field: String!, value: String!):String
		  addSubregion(regionarray: RegionInput, id: String!): RegionsArray
		  deletelandmark(_id:String!, name:String!):String	
		  addlandmark(_id:String!, name:String!):String		  
	  
	}


	input RegionInput {
       _id: String
       name: String
	   subregion: [String]
	   capital: String!
       leader: String!
       flag: String!
       landmark:  [String]
	   isitmap: Boolean!
	   owner : String
	   parent: String
   }
`;

module.exports = { typeDefs: typeDefs }