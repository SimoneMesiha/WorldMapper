const ObjectId = require('mongoose').Types.ObjectId;
const RegionArray = require('../models/regionsArray-model');
const Sorting = require('../utils/sorting')

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const region = await RegionArray.find({owner: _id}).sort({updatedAt: 'descending'});
			if(region) {
				return (region);
			} 
			//Added isitmap:true next to wowner // removed
		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getRegionsArrayById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await RegionArray.findOne({_id: objectId});
			if(region) return region;
			else return ({});
		},
	},
	Mutation: {


		createmap: async(_,args)=>{
			const { regionarray } = args;
			const objectId = new ObjectId();
			const { _id, name, subregion, capital, leader,flag, landmark,isitmap,owner,parent } = regionarray;
			const myMap = new RegionArray({
				_id: objectId,
				name: name,
				subregion: subregion,
				capital: capital,
				leader: leader,
				flag: flag,
				landmark: landmark,
				isitmap : isitmap,
				owner : owner,
				parent : parent
			});
			const updated = await myMap.save();   // .save() the query being sent to MongoDB
			if(updated) {
				console.log(myMap)
				return myMap;
			}
			return myMap;
		},
		addSubregion:async(_,args)=>{
			console.log("a")
			const {regionarray, id} =args;
			const objectId = new ObjectId();
			const parentID = new ObjectId(id)
			const {_id, name, subregion, capital, leader,flag, landmark,isitmap,owner,parent } = regionarray;
			const myMap = new RegionArray({
				_id: objectId,
				name: name,
				subregion: subregion,
				capital: capital,
				leader: leader,
				flag: flag,
				landmark: landmark,
				isitmap : isitmap,
				owner : owner,
				parent : parent
			});
			console.log(2)
			const updated = await myMap.save();   // .save() the query being sent to MongoDB
			// const addParent = await RegionArray.updateOne({_id:objectId},{parent: regionId}) //child adds a parent

			console.log(parentID);

			const parentt =  await RegionArray.findOne({_id: parentID}); //get the parent
			
			let subregions = parentt.subregion
			console.log(subregions)
			subregions.push(objectId)
			console.log(subregions)
			 

			const updateParent = RegionArray.updateOne({_id: parentID},{subregion: subregions});
			console.log("end result " + updateParent);



			console.log(4)

			
			if(updateParent) {
				console.log(updateParent)
				return updateParent;
			}
			return updateParent;
		},

		//deletes the map.
		deletemap: async (_, args) => {
			console.log("plz work")
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await RegionArray.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		deletesubregion: async(_,args)=>{
			const { _id, parentId} = args;
			const objectId = new ObjectId(_id);
			const parentIdObj= new ObjectId(parentId)
			const deleted = await RegionArray.deleteOne({_id: objectId});

			const parentt = await RegionArray.findOne({_id: parentIdObj})
			console.log(parentt);

			let parentSub = parentt.subregion;
			console.log("objectId:->" +objectId)
			let remove_ID = parentSub.filter(element=> element != objectId);
			console.log(remove_ID+ "            dkjfakjsfajds")
			let updated = await RegionArray.updateOne({_id:parentIdObj},{subregion:remove_ID});
			console.log(updated)


			if(deleted) return true;
			else return false;
		},



		updateRegionField: async (_,args)=>{
			console.log("we get here");
			const { _id, field, value } = args;
			console.log("do we get here thoug");
			const objectId = new ObjectId(_id);
			const updated = await RegionArray.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},

		updateSubregionField: async (_,args)=>{
			console.log("we get here");
			const { _id, field, value } = args;
			console.log(_id);
			console.log(field)
			console.log(value)
			const objectId = new ObjectId(_id);
			const updated = await RegionArray.updateOne({_id: objectId}, {[field]: value});
			console.log(1)
			if(updated) return value;
			else return "";
		},
		deletelandmark: async (_,args)=>{
			const {_id, name} =args
			console.log(_id)
			console.log(name)

			const objectId = new ObjectId(_id)
			const updated = await RegionArray.findOne({_id:objectId})
			let landmarks = updated.landmark
			landmarks = landmarks.filter(landmark=>landmark!=name)
			console.log(landmarks)
			const update = await RegionArray.updateOne({_id: objectId}, {landmark: landmarks});
			
			return "";
		},

		addlandmark: async (_,args)=>{
			const {_id, name} =args
			console.log("the value is" +name)

			const objectId = new ObjectId(_id)
			const updated = await RegionArray.findOne({_id:objectId})
			let landmarks = updated.landmark
			console.log("(1) "+ landmarks)
			landmarks.push(name)
			console.log("(2) "+ landmarks)
			console.log(landmarks)
	
			const update = await RegionArray.updateOne({_id: objectId}, {landmark: landmarks});
			return "";
		}




	
		// ,
		// /** 
		//  	@param 	 {object} args - a todolist id and an empty item object
		// 	@returns {string} the objectID of the item or an error message
		// **/
		// addItem: async(_, args) => {
		// 	const { _id, item , index } = args;
		// 	const listId = new ObjectId(_id);
		// 	const objectId = new ObjectId();
		// 	const found = await Todolist.findOne({_id: listId});
		// 	if(!found) return ('Todolist not found');
		// 	if(item._id === '') item._id = objectId;
		// 	let listItems = found.items;
		// 	if(index < 0) listItems.push(item);
		// 	else listItems.splice(index, 0, item);
			
			
		// 	const updated = await Todolist.updateOne({_id: listId}, { items: listItems });

		// 	if(updated) return (item._id)
		// 	else return ('Could not add item');
		// },
		// /** 
		//  	@param 	 {object} args - an empty todolist object
		// 	@returns {string} the objectID of the todolist or an error message
		// **/
		// addTodolist: async (_, args) => {
		// 	const { todolist } = args;
		// 	const objectId = new ObjectId();
		// 	const { id, name, owner, items , sortRule, sortDirection} = todolist;
		// 	const newList = new Todolist({
		// 		_id: objectId,
		// 		name: name,
		// 		owner: owner,
		// 		items: items,
		// 		sortRule: sortRule,
		// 		sortDirection: sortDirection,
		// 	});
		// 	const updated = await newList.save();
		// 	if(updated) {
		// 		console.log(newList)
		// 		return newList;
		// 	}
		// },
		// /** 
		//  	@param 	 {object} args - a todolist objectID and item objectID
		// 	@returns {array} the updated item array on success or the initial 
		// 					 array on failure
		// **/
		// deleteItem: async (_, args) => {
		// 	const  { _id, itemId } = args;
		// 	const listId = new ObjectId(_id);
		// 	const found = await Todolist.findOne({_id: listId});
		// 	let listItems = found.items;
		// 	listItems = listItems.filter(item => item._id.toString() !== itemId);
		// 	const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
		// 	if(updated) return (listItems);
		// 	else return (found.items);

		// },
		// /** 
		//  	@param 	 {object} args - a todolist objectID 
		// 	@returns {boolean} true on successful delete, false on failure
		// **/
		// deleteTodolist: async (_, args) => {
		// 	const { _id } = args;
		// 	const objectId = new ObjectId(_id);
		// 	const deleted = await Todolist.deleteOne({_id: objectId});
		// 	if(deleted) return true;
		// 	else return false;
		// },
		// /** 
		//  	@param 	 {object} args - a todolist objectID, field, and the update value
		// 	@returns {boolean} true on successful update, false on failure
		// **/
		// updateTodolistField: async (_, args) => {
		// 	const { field, value, _id } = args;
		// 	const objectId = new ObjectId(_id);
		// 	const updated = await Todolist.updateOne({_id: objectId}, {[field]: value});
		// 	if(updated) return value;
		// 	else return "";
		// },
		// /** 
		// 	@param	 {object} args - a todolist objectID, an item objectID, field, and
		// 							 update value. Flag is used to interpret the completed 
		// 							 field,as it uses a boolean instead of a string
		// 	@returns {array} the updated item array on success, or the initial item array on failure
		// **/
		// updateItemField: async (_, args) => {
		// 	const { _id, itemId, field,  flag } = args;
		// 	let { value } = args
		// 	const listId = new ObjectId(_id);
		// 	const found = await Todolist.findOne({_id: listId});
		// 	let listItems = found.items;
		// 	if(flag === 1) {
		// 		if(value === 'complete') { value = true; }
		// 		if(value === 'incomplete') { value = false; }
		// 	}
		// 	listItems.map(item => {
		// 		if(item._id.toString() === itemId) {	
					
		// 			item[field] = value;
		// 		}
		// 	});
		// 	const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
		// 	if(updated) return (listItems);
		// 	else return (found.items);
		// },
		// /**
		// 	@param 	 {object} args - contains list id, item to swap, and swap direction
		// 	@returns {array} the reordered item array on success, or initial ordering on failure
		// **/
		// reorderItems: async (_, args) => {
		// 	const { _id, itemId, direction } = args;
		// 	const listId = new ObjectId(_id);
		// 	const found = await Todolist.findOne({_id: listId});
		// 	let listItems = found.items;
		// 	const index = listItems.findIndex(item => item._id.toString() === itemId);
		// 	// move selected item visually down the list
		// 	if(direction === 1 && index < listItems.length - 1) {
		// 		let next = listItems[index + 1];
		// 		let current = listItems[index]
		// 		listItems[index + 1] = current;
		// 		listItems[index] = next;
		// 	}
		// 	// move selected item visually up the list
		// 	else if(direction === -1 && index > 0) {
		// 		let prev = listItems[index - 1];
		// 		let current = listItems[index]
		// 		listItems[index - 1] = current;
		// 		listItems[index] = prev;
		// 	}
		// 	const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
		// 	if(updated) return (listItems);
		// 	// return old ordering if reorder was unsuccessful
		// 	listItems = found.items;
		// 	return (found.items);

		// },

		// sortItems: async (_, args) => {
		// 	const { _id, criteria } = args;
		// 	const listId = new ObjectId(_id);
		// 	const found = await Todolist.findOne({_id: listId});
		// 	let newDirection = found.sortDirection === 1 ? -1 : 1; 
		// 	console.log(newDirection, found.sortDirection);
		// 	let sortedItems;

		// 	switch(criteria) {
		// 		case 'task':
		// 			sortedItems = Sorting.byTask(found.items, newDirection);
		// 			break;
		// 		case 'due_date':
		// 			sortedItems = Sorting.byDueDate(found.items, newDirection);
		// 			break;
		// 		case 'status':
		// 			sortedItems = Sorting.byStatus(found.items, newDirection);
		// 			break;
		// 		case 'assigned_to':
		// 			sortedItems = Sorting.byAssignedTo(found.items, newDirection);
		// 			break;
		// 		default:
		// 			return found.items;
		// 	}
		// 	const updated = await Todolist.updateOne({_id: listId}, { items: sortedItems, sortRule: criteria, sortDirection: newDirection })
		// 	if(updated) return (sortedItems);

		// }

	}
}