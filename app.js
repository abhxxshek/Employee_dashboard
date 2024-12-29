const express = require('express');
const bodyParser = require('body-parser');
const app =new express();
var employee = require('./employee.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { path:employee });
});

app.get('/add', (req, res) => {
    res.render('add-employee');
});


app.post('/add', (req, res) => {
    const { employeeName, employeeDesignation, employeeLocation, employeeSalary } = req.body;
    const newEmployee = {
        id:employee[employee.length - 1].id + 1,
        name: employeeName,
        designation: employeeDesignation,
        location: employeeLocation,
        salary: parseFloat(employeeSalary)
    };
    employee.push(newEmployee);
    res.redirect('/');
});


app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const employees = employee.find(emp => emp.id === parseInt(id));

    if (employees) {
        res.render('update-employee', { employees });
    } else {
        res.redirect('/');
    }
});


app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { employeeName, employeeDesignation, employeeLocation, employeeSalary } = req.body;

    let employees = employee.find(emp => emp.id === parseInt(id));

    if (employees) {
        employees.name = employeeName;
        employees.designation = employeeDesignation;
        employees.location = employeeLocation;
        employees.salary = parseFloat(employeeSalary);
    }

    res.redirect('/');
});


app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    employee = employee.filter(emp => emp.id !== parseInt(id));
    res.redirect('/');
});


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
