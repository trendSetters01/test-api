
function fetchAddressDetails() {
    const address = document.getElementById('addressInput').value;
    fetchData(`/address/${address}`, 'addressDetails');
}

function fetchBlockDetails() {
    const round = document.getElementById('blockInput').value;
    fetchData(`/block/${round}`, 'blockDetails');
}

function fetchTransactionDetails() {
    const txid = document.getElementById('transactionInput').value;
    fetchData(`/transaction/${txid}`, 'transactionDetails');
}

function fetchAssetDetails() {
    const assetId = document.getElementById('assetInput').value;
    fetchData(`/asset/${assetId}`, 'assetDetails');
}

function fetchApplicationDetails() {
    const appId = document.getElementById('appInput').value;
    fetchData(`/application/${appId}`, 'appDetails');
}

function fetchLedgerSupply() {
    fetchData('/ledger/supply', 'ledgerSupply');
}

function fetchData(endpoint, elementId) {
    fetch(endpoint)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            document.getElementById(elementId).textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function fetchAllTransactionsByAddress() {
    const address = document.getElementById('allTransactionsInput').value;
    fetchData(`/address/${address}/transactions`, 'allTransactionsDetails');
}

function resetField(inputId, outputId) {
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).textContent = '';
}
