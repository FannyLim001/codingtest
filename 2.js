// Implement Custom filter Function
// Problem Statement:
// Write a JavaScript function named customFilter that replicates the behavior of the Array.prototype.filter method without using the built-in filter method. This function should take an array and a callback function as arguments. The customFilter function should return a new array consisting of all elements for which the callback function returns true.

// Parameters:

// array: An array containing elements that will be filtered through the callback function.
// callback: A function that takes three arguments: the current element, the index of the current element, and the array itself. The callback function returns a boolean value.
// Requirements:

// Do not use the built-in Array.prototype.filter method.
// The callback function should be called on each element of the array, with the element, its index, and the array itself passed as arguments.
// Elements for which the callback function returns true should be included in the new array.
// The original array should not be modified.

const numbers = [1, 2, 3, 4, 5];
const isEven = (element) => element % 2 === 0;

function customFilter(array, callback) {
	//CODE HERE
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		var checkNumber = callback(array[i], array.indexOf(i), array);
		if (checkNumber == true) {
			newArray.push(array[i]);
		}
	}
	return newArray;
}

const filteredNumbers = customFilter(numbers, isEven);
console.log(filteredNumbers);
// Expected result : [ 2, 4 ]
