//current year
const date = new Date();
const year = date.getFullYear();
document.getElementById('currentYear').innerHTML = year;

//last Modification
const lastModified = document.lastModified;
document.getElementById('lastModified').innerHTML='Last Modified: ' + lastModified;