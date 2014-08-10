angular
.module("app").controller ("ItemController", ItemController);


function ItemController ($http) {
	
	var vm = this;
	vm.addAge = addAge;
	vm.addPerson = addPerson;
	vm.removePerson = removePerson;
	vm.test = [];
	
	
	vm.personToAdd = {};

	vm.names = [
	{
		name: "Alex",
		age: 25
	},
	{
		name: "Lukas",
		age: 26
	},
	{
		name: "Gustav",
		age: 78
	}
	];


	function addAge(person){
		person.age = person.age + 5;
	}

	function addPerson(){
		vm.names.push(vm.personToAdd);
		vm.personToAdd = {};
	}

	function removePerson(person){
		for (i = 0; i <= vm.names.length; i++){
			if(person === vm.names[i]){
				vm.names.splice(i, 1);
			}
		}
	}



};