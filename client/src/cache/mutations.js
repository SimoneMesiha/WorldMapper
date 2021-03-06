import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;



export const CREATE_MAP = gql`
	mutation CreateMap($regionarray : RegionInput){
		createmap(regionarray: $regionarray){
			_id
			name
			subregion
			capital
			leader
			flag
			landmark
			isitmap
			owner
			parent
		}
	}
`;
export const ADD_SUBREGION = gql`
	mutation AddSubregion($regionarray: RegionInput!, $id: String!){
		addSubregion(regionarray: $regionarray, id:$id){
			_id
			name
			subregion
			capital
			leader
			flag
			landmark
			isitmap
			owner
			parent
		}
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deletemap(_id: $_id)
	}
`;
export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($_id: String! $parentId: String!){
		deletesubregion(_id: $_id, parentId:$parentId)
	}

`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $field: String!, $value: String!) {
		updateRegionField(_id: $_id, field: $field, value: $value)
	}
`;
export const UPDATE_SUBREGION_FIELD =gql`
	mutation UpdateSubregionField($_id: String!, $field: String!, $value: String!){
		updateSubregionField(_id: $_id, field: $field, value: $value)
	}
`;

export const DELETE_LANDMARK = gql`
	mutation DeleteLandMark($_id:String!, $name:String!){
		deletelandmark(_id:$_id, name:$name)
	}
`;

export const ADD_LANDMARK = gql`
	mutation AddLandMark($_id:String!, $name:String!){
		addlandmark(_id:$_id, name:$name)
	}
`;




























export const DELETE_TODOLIST = gql`
	mutation DeleteTodolist($_id: String!) {
		deleteTodolist(_id: $_id)
	}
`;



export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;


export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;





export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const SORT_ITEMS = gql`
	mutation SortItems($_id: String!, $criteria: String!) {
		sortItems(_id: $_id, criteria: $criteria) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const ADD_TODOLIST = gql`
	mutation AddTodolist($todolist: TodoInput!) {
		addTodolist(todolist: $todolist) {
			_id
			name
			owner
			items {
				_id
				description
				due_date
				assigned_to
				completed
			}
			sortRule
			sortDirection
		}
	}
`;


export const UPDATE_TODOLIST_FIELD = gql`
	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
		updateTodolistField(_id: $_id, field: $field, value: $value)
	}
`;
