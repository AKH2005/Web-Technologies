function showData() {

    const student = {
        id: 101,
        name: "Priya",
        department: "CSE",
        marks: 92
    };

    const { id, name, department, marks } = student;

    let grade = marks >= 90 ? "A" : marks >= 75 ? "B" : "C";

    const updatedStudent = {
        ...student,
        grade: grade
    };

    document.getElementById("output").innerHTML =
        `ID:${id} Name:${name} Department:${department} Marks:${marks} Grade:${grade} <br><br>
         ${JSON.stringify(updatedStudent)}`;
}