// Efficient Meeting Scheduler
// Problem Statement:
// You are developing a feature for a calendar application that helps users find available meeting times. Your task is to implement a MeetingScheduler class that supports the following operations:

// schedule(start, end): Adds a new meeting to the calendar. The start and end parameters are integers representing the start time and end time of the meeting (in a 24-hour format). This method should return true if the meeting was successfully scheduled without any conflicts, and false otherwise.

// findAvailableSlots(duration, start, end): Finds all available slots in the calendar that can accommodate a meeting of duration minutes, within the specified start and end times. This method should return a list of available slots, where each slot is represented by a tuple (availableStart, availableEnd).

// Meetings cannot overlap, but they can start immediately after another meeting ends. For simplicity, assume that all times are in minutes from the start of the day (e.g., 9:00 AM is represented as 540).

// Constraints:
// 0 ≤ start < end ≤ 24 * 60
// 1 ≤ duration ≤ 24 * 60
// The number of calls to schedule and findAvailableSlots will not exceed 104.

function createMeetingScheduler() {
	let meetings = []; // Closure to store meetings

	function schedule(start, end) {
		for (var i = 0; i < meetings.length; i++) {
			var [existingStart, existingEnd] = meetings[i];
			if (
				(start >= existingStart && start < existingEnd) ||
				(end > existingStart && end <= existingEnd) ||
				(start <= existingStart && end >= existingEnd)
			) {
				console.log("There's a conflict with an existing meeting.");
				return false;
			}
		}

		meetings.push([start, end]);
		console.log(
			"True: Meeting scheduled from " +
				secondsToMinutes(start) +
				" to " +
				secondsToMinutes(end)
		);
		return meetings;
	}

	function findAvailableSlots(duration, start, end) {
		const availableSlots = [];

		// Sort meetings based on start time
		meetings.sort((a, b) => a[0] - b[0]);

		// Check the slot before the first meeting
		if (meetings.length > 0 && meetings[0][0] - start >= duration) {
			availableSlots.push([start, meetings[0][0]]);
		}

		// Check slots between meetings
		for (var i = 0; i < meetings.length - 1; i++) {
			var currentEnd = meetings[i][1];
			var nextStart = meetings[i + 1][0];

			// Calculate the available slot between the current meeting and the next meeting
			var availableStart = currentEnd;
			var availableEnd = nextStart;

			// If the duration can fit in the available slot, add it to availableSlots array
			if (availableEnd - availableStart >= duration) {
				availableSlots.push([availableStart, availableEnd]);
			}
		}

		// Check the slot after the last meeting
		if (
			meetings.length > 0 &&
			end - meetings[meetings.length - 1][1] >= duration
		) {
			availableSlots.push([meetings[meetings.length - 1][1], end]);
		}

		return availableSlots;
	}

	function secondsToMinutes(seconds) {
		var hours = Math.floor(seconds / 60);
		var mins = seconds % 60;
		return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
	}

	return { schedule, findAvailableSlots };
}

const scheduler = createMeetingScheduler();

// Schedule some meetings
console.log(scheduler.schedule(60, 120)); // true: Meeting scheduled from 01:00 to 02:00
console.log(scheduler.schedule(150, 180)); // true: Meeting scheduled from 02:30 to 03:00

// Find available slots
console.log(scheduler.findAvailableSlots(30, 0, 240));
// Expected Output: [[0, 60], [120, 150], [180, 240]]
// Explanation: Shows available slots before the first meeting, between the two meetings, and after the last meeting within the specified range.
