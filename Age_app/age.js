 const input = document.querySelector("input");
const p = document.querySelector("p");
const dateCont = document.querySelector(".dateCont");
const button = document.querySelector("button");
input.max = new Date().toISOString().split("T")[0];

button.addEventListener("click", () => {
    if (input.value) {
        let date = new Date();
        let dt = date.getDate();
        let mt = date.getMonth() + 1;
        let yt = date.getFullYear();

        let bday = new Date(input.value);
        let d = bday.getDate();
        let m = bday.getMonth() + 1;
        let y = bday.getFullYear();

        let d3, m3, y3;

        y3 = yt - y;
        if (mt >= m) {
            m3 = mt - m;
        } 
        else {
            y3--;
            m3 = 12 + mt - m;
        }
        if (dt >= d) {
            d3 = dt - d;
        } 
        else {
            m3--;
            d3 = getDaysInMonth(y, m) + dt - d;
        }
        if (m3 < 0) {
            m3 = 11;
            y3--;
        }

        p.innerHTML = `You are <span>${y3}</span> years ,<span>${m3}</span> months and
        <span>${d3}</span> days old`;
          input.value = "";
    } 
    else {
          p.innerHTML = "Please enter the required information ";
    }
});
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}