interface Question {
    q: string;
    a: string;
}

let input: HTMLInputElement;
let tbody: HTMLElement;
let data: Question[];

const filter = (question: Question): boolean => {
    const { q, a } = question;
    const query = input.value.toLowerCase();

    return q.toLowerCase().search(query) !== -1 || a.toLowerCase().search(query) !== -1;
}

const ROW = (question: Question): HTMLTableRowElement => {
    const tr = document.createElement("tr");

    tr.appendChild(TD(question.q));
    tr.appendChild(TD(question.a));

    return tr;
}

const TD = (s: string): HTMLTableDataCellElement => {
    const td = document.createElement("td");
    td.innerHTML = s;
    return td;
}

const renderRow = (question: Question, idx: number) => {
    const row = ROW(question);
    tbody.appendChild(row);
}

const renderTable = () => {
    tbody.innerHTML = "";
    const filtered = data.filter(filter);
    console.log(data.length, filtered.length)
    filtered.forEach(renderRow)
}




(async () => {
    data = await (fetch("/questions.json").then(r => r.json()));

    input = document.querySelector<HTMLInputElement>("#input")!;
    tbody = document.querySelector<HTMLElement>("#tbody")!;

    input.addEventListener("input", ()=>renderTable());


    renderTable();

})();
