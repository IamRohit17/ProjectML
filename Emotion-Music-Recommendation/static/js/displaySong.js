function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

// Constantly Update Table
setInterval(function () {
  getJSON('/t', function (err, data) {
    if (err !== null) {
      console.error('Error fetching data:', err);
    } else {
      createHtmlTable(data);
      console.log(data, "DATA");
    }
  });
}, 100);

function createHtmlTable(data) {
  var resultArea = document.querySelector(".song-list");
  // Clear result div
  resultArea.innerHTML = "";
  // Create table
  var table = document.createElement("table");
  table.id = "DynamicTable";
  resultArea.appendChild(table);
  // Create table header
  var headerRow = table.insertRow();
  var headers = ["Name", "Album", "Artist"];
  headers.forEach(headerText => {
    var headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  // Fill table with data
  data.forEach(function (value) {
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    cell1.textContent = value.Name;
    cell2.textContent = value.Album;
    cell3.textContent = value.Artist;
  });
}