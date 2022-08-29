// Project Class
class Project
{
    constructor(name, id)
    {
        this.name = name;
        this.id = id;
    }

    // Display
    displayProject()
    {
        console.log("Name: " + this.name + ", ID: " + this.id);
    }
}

// Person Class
class Person
{
    constructor(id, firstname, surname, email, username, profilePic)
    {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.profilePic = profilePic;
    }
}

// Ticket Class
class Ticket
{
    constructor(summary, details, identified, dateID, projectName, personName, status = "open", priority, targetResDate, actualResDate = null, resolutionSumm = "")
    {
        this.summary = summary,
        this.details = details,
        this.identified = identified,
        this.dateID = dateID,
        this.project = setProject(projectName),
        this.assigned = setPerson(personName),
        this.status = status,
        this.priority = priority,
        this.targetResDate = targetResDate,
        this.actualResDate = actualResDate,
        this.resolutionSumm = resolutionSumm
    }
}

// Creation of project objects
const project1 = new Project("omega", "omg");
const project2 = new Project("alpha", "alp");
const project3 = new Project("beta", "bet");

// Make Map of projects so that we don't need a case for every project when setting the project.
let projects = new Map
([
    [project1.name, project1],
    [project2.name, project2],
    [project3.name, project3]
])

// Creation of People
const person1 = new Person(001, "emile", "Fourie", "emileFourie@gmail.com", "Emile4Rie", "web-dev-1.png");
const person2 = new Person(002, "tamaryn", "Nell", "tamNell@gmail.com", "TimTam6198", "web-dev-2.png");
const person3 = new Person(003, "ruhan", "Potgieter", "ruhanPotgieter@gmail.com", "Potter4131", "web-dev-3.png");
const person4 = new Person(004, "damon", "Hattingh", "damonHattingh@gmail.com", "DaRealRobinDamon", "web-dev-4.png");

// Make Map of people so that we don't need a case for every person when setting the person.
let people = new Map
([
    [person1.firstname, person1],
    [person2.firstname, person2],
    [person3.firstname, person3],
    [person4.firstname, person4]
])

function store()
{ 
    hidepopup();
    // alert("running")
    //stores items in the localStorage
    var summary = document.getElementById("summ").value;
    var details = document.getElementById('details').value;
    var user = document.getElementById('identifier').value;
    var dateID = document.getElementById('dateID').value;
    var projectName = document.getElementById('projName').value;
    var personName = document.getElementById('DevName').value;
    var status = document.getElementById('status').value;
    var priority = document.getElementById('selectPriority').value;
    var targetDate = document.getElementById('targetDate').value;
    // alert("B4 Ticket");
    let ticket = new Ticket(summary, details, user, dateID, projectName, personName, status, priority, targetDate);

    let key = 0;
    // alert("B4 Loop")
    if(localStorage.length == 0)
    {
        key = 1;
    }
    else
    {
        key = localStorage.length + 1;
    }
    //converting object to string
    // alert("B4 Save")
    window.localStorage.setItem(key, JSON.stringify(ticket));
    // alert(localStorage.length);
}

function setProject(projectName)
{
    // set project object
    
    try
    {
        if(projectName != null && isNaN(projectName))
        {
            let proj = projectName.toLowerCase();
            // map of projects
            if(projects.has(proj))
            {
                return projects.get(proj);
            }
            else
            {
                throw "The project entered doesn't exist, please edit the ticket and add a valid project.";
            }
        }
        else
        {
            throw "The project entered was incorrect, please edit the ticket and add a valid project.";
        }
    }
    catch (e)
    {
        alert(e);
        return null;
    }
}

function setPerson(personName)
{
    // assign person object
    try
    {
        if(personName != null && isNaN(personName))
        {
            // alert("The name is: " + personName);
            if(people.has(personName))
                {
                    return people.get(personName);
                }
                else
                {
                    throw "The person entered doesn't exist, please edit the ticket and add a valid person.";
                }
        }
        else
        {
            throw "The person entered was incorrect, please edit the ticket and add a valid person.";
        }
    }
    catch (e)
    {
        alert(e);
        return null;
    }
}

// Clear all tickets
function clearStorage()
{ //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}

function showAllRecords() 
{
    alert(localStorage.length);
    for (var i = 0; i < localStorage.length; i++) 
    {
        let key = localStorage.key(i); //records
    
        let records = window.localStorage.getItem(key);

        let p = document.createElement("p");
    
        let infor = document.createTextNode(records);
    
    
    
        p.appendChild(infor);
    
        let el = document.getElementById("output");
    
        el.appendChild(p);
    }    
}

window.onload =function()
{ //ensures the page is loaded before functions are executed.
    document.getElementById("submitButton").onclick = store
    document.getElementById("clearButton").onclick = clearStorage
    // document.getElementById("removeButton").onclick = removeItem
    // document.getElementById("retrieveButton").onclick = retrieveRecords
    document.getElementById("retrieveButton").onclick = showAllRecords
    // document.getElementById("editButton").onclick = editTicket
    // document.getElementById("saveButton").onclick = saveTicket
}