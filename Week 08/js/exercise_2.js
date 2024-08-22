const students = [
    { id: 1, name: 'Alice Stark', grade: 80 },
    { id: 2, name: 'Bob', grade: 67 },
    { id: 3, name: 'Carol', grade: 78 },
    { id: 4, name: 'David', grade: 83 },
];

// Display the information of each student.

// Method 01.
for (const student of students) {
    console.log(`ID: ${student.id} - Name: ${student.name}`)
}

// Method 02.
students.forEach(student => {
    console.log(`ID: ${student.id} - Name: ${student.name}`)
})

// Create a new array based on this array with one more attribute: HD.
// For this new attribute, it is true if the respective grade is >= 80;
// otherwise, it is false.
const studentsWithHD = students.map(student => {
    return {
        ...student,
        hd: student.grade >= 80
    }
})

console.log(studentsWithHD)

// Create a new array based on this array,
// but include only the students whose grades are between 70 and 80.
const filter_1 = students.filter(student => student.grade >= 70 && student.grade <= 80)
const filter_2 = students.filter(student => student.name.startsWith("B"))
const filter_3 = students.filter(student => student.name.includes("Alice"))
const filter_4 = students.filter(student => student.id === 1)

console.log(filter_1)
console.log(filter_4[0])

// Return the average score of all students.

// Method 01
let totalScore_1 = 0

for (const student of students) {
    totalScore_1 += student.grade
}

let average_1 = totalScore_1 / students.length

// Method 02
let totalScore_2 = 0
students.forEach(student => totalScore_2 += student.grade)

let average_2 = totalScore_1 / students.length

// Method 03
let totalScore_3 = students.reduce((total, student) => total + student.grade, 0)
let average_3 = totalScore_3 / students.length