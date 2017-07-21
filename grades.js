"use strict";

window.grades = {};

// In this exercise, you will be implementing functions that will help in
// analyzing a class of students.
// You can find the data under `data/grades.js`

// Data Format:
//
// The data that will be run through each program is an array of student objects.
// The student object is comprised of these keys:
//  - 'name', a string for the student's first name (warning - not unique!)
//  - 'major', a string indicating the user's major (there are only 4 majors)
//  - 'grades', an object with two keys, 'class1' and 'class2', whose values
//     are integers from 1 to 4 indicating that students performance in the
//     class.

// [Helper] Exercise 0.A grades.average(arr<Number[]>)
// Write a function that takes an array of numbers and returns the average of all of them.
//
// ex. grades.average([0, 1, 2, 3]) -> 1.5
// ex. grades.average([1, 2, 4, 1]) -> 2
// ex. grades.average([]) -> 0
// ex. grades.average([0, 0]) -> 0
//
// hint. use _.reduce()
grades.average = function(arr) {
  // YOUR CODE HERE
  if(arr.length > 0){
    var sum = _.reduce(arr, function(a, b){
      return a + b;
    }
    )
    return sum / arr.length
  }
  else{
    return 0
  }
};

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  // YOUR CODE HERE
  var gradeObj = student.grades
  return ((gradeObj.class1 + gradeObj.class2) / 2)


};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
  var dummy = data[0]
  for(var i = 1; i<data.length;i++){
    if(grades.getGPA(data[i]) > grades.getGPA(dummy)){
      dummy = data[i]
    }

  }
  return dummy

}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the highest GPA
//
// hint. you can use highestGPA if you'd like.
grades.majorWithHighestGPA = function(data) {
  // YOUR CODE HERE
var objArr = _.groupBy(data , function(data){
  return data.major;
});
objArr = _.mapObject(objArr, function (arr, majorName){
  return _.map(arr ,function(student){
    return grades.getGPA(student);
  })
})
objArr = _.mapObject(objArr , function (arr, majorName){
  return grades.average(arr);
})
  var maxGPA = 0;
  var maxMajor = "";
  _.mapObject(objArr, function(GPA, major){
    if(GPA > maxGPA){
      maxMajor = major;
      maxGPA = GPA
    }
  });
  return maxMajor;

}















// var groupByMajorObj = _.groupBy(data, "major");
// var majorList = Object.keys(groupByMajorObj);
// var avgGPAMajor = [];
// for(var i=0; i< majorList.length; i++){
//   var majorStudentList = groupByMajorOrb[majorList[i]]
//   var gpa = 0;
//   for (var j =0; j < majorStudentList.length; j++){
//     gpa += grades.getGPA(majorStudentList[j]);
//   }
//   avgGPAMajor.push( gpa /majorStudentList.length);
// }
//
//   var majorWithHighestGPA = majorList[0];
//   var gpa = avgGPAMajor[0];
//   for(var i =1; i<majorList.length; i++){
//     var temp = avgGPAMajor[i];
//     if(temp > gpa){
//       gpa = temp;
//       majorWithHighestGPA = majorList[i]
//     }
// }
// return majorWithHighestGPA;
//
//   }








//   var econArr =[];
//   var artArr = [];
//   var filmArr = [];
//   var compArr = [];
//   var EconSum = 0
//   var ArtSum = 0
//   var FilmSum = 0
//   var CompSum = 0
//   var averagedData = data.map(function(smeet) {
//
//   })
//   var final = [FilmSum, EconSum, ArtSum, CompSum]
//   console.log(final)
//   for(var i=0; i < data.length; i++){
//     if(data[i]['major'] === "Economics"){
//       econArr.push(grades.getGPA(data[i]));
//       EconSum = grades.average(econArr);
//       console.log(EconSum, "Econ")
//     }
//     if(data[i]['major'] === "Art History"){
//       artArr.push(grades.getGPA(data[i]));
//       ArtSum = grades.average(artArr);
//       console.log(ArtSum, "Art")
//     }
//     if(data[i]['major'] === "Film Studies"){
//       filmArr.push(grades.getGPA(data[i]));
//       FilmSum = grades.average(filmArr);
//       console.log(FilmSum, "Film")
//     }
//     if(data[i]['major'] === "Computer Science"){
//       compArr.push(grades.getGPA(data[i]));
//       CompSum = grades.average(compArr);
//       console.log(CompSum, "Comp")
//     }
//   }
// var dummy = final[0];
// console.log("***", dummy)
//   for(var i =0; i< final.length; i++){
//     if(final[i] > dummy){
//       dummy = final[i]
//     }
//   }
//   if(dummy === EconSum){
//     return "Economics"
//   }
//   if(dummy === ArtSum){
//     return "Art History"
//   }if(dummy === FilmSum){
//     console.log("***",final)
//     return "Film Studies"
//   }if(dummy === CompSum){
//     return "Computer Science"
//   }




// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
var classOne =[];
var classTwo =[];
_.forEach(data , function(value, key){
  var grade = value.grades;
  classOne.push(grade.class1);
  classTwo.push(grade.class2);
})
var class1avg = grades.average(classOne);
var class2avg = grades.average(classTwo);
var finalObj = {
  class1: class1avg,
  class2: class2avg,
};
return finalObj
};
