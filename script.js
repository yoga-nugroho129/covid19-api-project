const numberFormater = (e) => {
  return new Intl.NumberFormat().format(e)
}

const mainContent = document.querySelector('.main-content')

fetch(`https://api.covid19api.com/summary`)
  .then((response) => response.json())
  .then((response) => {
    let status = document.readyState
    if (status == 'complete') {
      document.querySelector('#load').style.visibility = 'hidden'
    }
    const globalResponse = response.Global
    const grandTotal = document.querySelector('.grand-total')

    let countryResponse = response.Countries

    grandTotal.innerHTML = `<div class="col-lg-4 text-center">
                              <div class="total-cases my-2 p-3 card">
                                <h3 class="total-title">Total Cases:</h3>
                                <p class="total-number mb-0">${numberFormater(
                                  globalResponse.TotalConfirmed
                                )}</p>
                              </div>
                            </div>
                            <div class="col-lg-4 text-center">
                              <div class="total-recovered my-2 p-3 card">
                                <h3 class="total-title">Total Recovered:</h3>
                                <p class="total-number mb-0">${numberFormater(
                                  globalResponse.TotalRecovered
                                )}</p>
                              </div>
                            </div>
                            <div class="col-lg-4 text-center">
                              <div class="total-deaths my-2 p-3 card">
                                <h3 class="total-title">Total Deaths:</h3>
                                <p class="total-number mb-0">${numberFormater(
                                  globalResponse.TotalDeaths
                                )}</p>
                              </div>
                            </div>`

    createTable(countryResponse)

    // soting table
    let tableHeader = document.querySelectorAll('.table-header')
    tableHeader.forEach((th) => {
      th.addEventListener('click', function () {
        console.log(this.dataset)
        let tableColumn = this.dataset.table
        console.log(tableColumn)

        if (this.dataset.sort == 'asc') {
          this.dataset.sort = 'desc'
          countryResponse = countryResponse.sort((a, b) =>
            a[tableColumn] > b[tableColumn] ? 1 : -1
          )
        } else {
          this.dataset.sort = 'asc'
          countryResponse = countryResponse.sort((a, b) =>
            a[tableColumn] < b[tableColumn] ? 1 : -1
          )
        }
        createTable(countryResponse)
      })
    })
  })

let createTable = function (db) {
  let dataTable = ''
  db.forEach((data, index) => {
    dataTable += showDataTabel(data, index)
  })

  const tableResults = document.querySelector('.table-results')
  tableResults.innerHTML = dataTable
}

const showDataTabel = (data, index) => {
  return `<tr>
            <th scope="row">${index + 1}</th>
            <td>${data.Country}</td>
            <td>${numberFormater(data.TotalConfirmed)}</td>
            <td>${numberFormater(data.NewConfirmed)}</td>
            <td>${numberFormater(data.TotalDeaths)}</td>
            <td>${numberFormater(data.NewDeaths)}</td>
            <td>${numberFormater(data.TotalRecovered)}</td>
            <td>${numberFormater(data.NewRecovered)}</td>
          </tr>`
}
