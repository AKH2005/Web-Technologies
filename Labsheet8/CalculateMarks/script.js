function calculate() {
    let studentName = "Tarun";
    let mark1 = 85;
    let mark2 = 90;
    let mark3 = 88;

    const calculateAverage = (m1, m2, m3) => {
        return (m1 + m2 + m3) / 3;
    };

    let total = mark1 + mark2 + mark3;
    let avg = calculateAverage(mark1, mark2, mark3);

    document.getElementById("output").innerHTML =
        `Student Name: ${studentName} <br>
         Total Marks: ${total} <br>
         Average Marks: ${avg.toFixed(2)}`;
}