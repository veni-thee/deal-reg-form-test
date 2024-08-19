let headers = new Headers();
headers.append("X-CSCAPI-KEY", "TnJJd0dldFlSQTdyMjRKT3BZM1E4eEpGdkFaQkNzZjBKdjE1cnRPNg==");

let countrySelect = document.querySelector('.country'),
 stateSelect = document.querySelector('.state'),
 citySelect = document.querySelector('.city')

let requestOptions = {
   method: 'GET',
   headers: headers,
   redirect: 'follow'
};

let countryCode = '';
let stateCode = '';

//Update this array if new country codes are added in SF:
const countryCodesInSF = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CD", "CG", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "TL", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "EU", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "KP", "NO", "OM", "PK", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "ZZ"];

//Update this array if new state codes are added in SF:
const stateCodesInSF = ["ABU", "AC", "ADA", "AG", "AG", "AL", "AL", "AK", "AB", "AL", "ALSACE", "AP", "AM", "AN", "AN", "AP", "ANG", "34", "ANK", "ANT", "ANT", "AO", "AR", "AZ", "AR", "AR", "AP", "AS", "AT", "ATT", "ACT", "AV", "BAD", "BA", "BC", "BS", "BAN", "BAR", "BA", "BT", "BAS", "BED", "11", "BL", "BN", "BG", "BER", "BI", "BR", "BO", "BZ", "BS", "BR", "BC", "BUC", "BON", "CA", "CA", "CAL", "CL", "CAM", "CM", "CB", "CAN", "CAN", "CI", "CW", "CE", "CT", "CZ", "CN", "CE", "CER", "CH", "CT", "CS", "CH", "CH", "71", "50", "CE", "CO", "CL", "CO", "CO", "CT", "CO", "CS", "CR", "KR", "CUN", "CN", "DN", "DD", "DE", "DL", "DER", "DC", "DCA", "DF", "DL", "DOR", "D", "DUM", "DG", "EN", "ES", "ESS", "DF", "FM", "FE", "FLE", "FI", "FL", "FG", "FC", "FR", "35", "G", "62", "GE", "GA", "GA", "GO", "GO", "GLN", "GR", "GT", "44", "45", "GR", "52", "GJ", "HAD", "HAI", "46", "HAM", "HR", "HI", "13", "23", "41", "HER", "HG", "HP", "91", "42", "43", "ID", "ILE", "IL", "IM", "IN", "IA", "ISE", "IS", "IZM", "JA", "JK", "JH", "32", "36", "22", "KS", "KA", "KY", "KL", "KY", "KE", "KK", "AQ", "LD", "LAN", "LS", "PAZ", "RIO", "SP", "LT", "LE", "LC", "LM", "21", "LIM", "LK", "LI", "LO", "LD", "LA", "LH", "LU", "92", "MC", "MP", "MH", "ME", "MN", "MB", "MN", "MA", "MAR", "MD", "MS", "MA", "MT", "MT", "MS", "MO", "MH", "VS", "ML", "ME", "ME", "MI", "MI", "MI", "MG", "MN", "MIR", "MS", "MO", "MZ", "MO", "MN", "MT", "MB", "MO", "MUR", "NL", "NA", "NA", "NE", "15", "NV", "NB", "NL", "NH", "NJ", "NM", "NSW", "NY", "64", "NOR", "NC", "ND", "NT", "NT", "NO", "NS", "NL", "NU", "NU", "OA", "OR", "OY", "OG", "OH", "OK", "OT", "ON", "OR", "OR", "OTA", "OXF", "PD", "PA", "PA", "PB", "PR", "PAR", "PR", "PV", "PA", "PE", "PG", "PU", "PE", "PC", "PI", "PI", "PT", "PN", "PZ", "PO", "PE", "PY", "PB", "PB", "PYR", "63", "QC", "QLD", "QE", "QUI", "QR", "RG", "RJ", "RA", "RC", "RE", "REN", "RI", "RI", "RN", "RJ", "RN", "RS", "RM", "RO", "RR", "RN", "RO", "SAL", "SA", "SL", "SC", "SP", "SK", "SS", "SV", "SE", "SEV", "61", "37", "31", "14", "51", "SI", "SK", "SI", "SO", "SO", "SO", "SA", "SC", "SD", "STA", "SUF", "SUR", "SR", "TB", "TM", "TN", "TA", "TAS", "TN", "TE", "TR", "TX", "12", "TA", "TL", "TO", "TP", "TN", "TV", "TS", "TR", "TRU", "TO", "UD", "UT", "UT", "UP", "VAL", "VA", "VAU", "VE", "VE", "VB", "VC", "VT", "VR", "VV", "VI", "VIC", "VA", "VT", "WA", "WD", "WEL", "WB", "WA", "WH", "WV", "WX", "WW", "WIL", "WI", "WY", "65", "54", "YU", "YT", "53", "YVE", "YY", "ZA", "33", "ZUR"];

function loadCountries() {
 fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
 .then((response) => response.json())
 .then((data) => {

  data.forEach(country => {
   const option = document.createElement('option')
   option.value = country.iso2
   option.textContent = country.name
   countrySelect.appendChild(option)
  })
 })
 .catch(error => console.log('error', error));

 stateSelect.disabled = true
 stateSelect.style.pointerEvents = 'none'
}

function loadStates() {
 stateSelect.disabled = false
 stateSelect.style.pointerEvents = 'auto'

 const selectedCountryCode = countrySelect.value;

 if (countryCodesInSF.includes(selectedCountryCode)) {
  if (selectedCountryCode != undefined) {
   this.countryCode = selectedCountryCode;
  } else {
   this.countryCode = '';
  }
  
 } else {
  this.countryCode = '';
 }

 document.getElementById('country_code').value = this.countryCode;
 stateSelect.innerHTML = '<option value="">Select State/Province</option>'

 fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/states`, requestOptions)
 .then((response) => response.json())
 .then((data) => {

  data.sort((a, b) => {
   const stateA = a.name.toUpperCase(); // ignore upper and lowercase
   const stateB = b.name.toUpperCase(); // ignore upper and lowercase
   if (stateA < stateB) {
     return -1;
   }
   if (stateA > stateB) {
     return 1;
   }
    
   return 0;
   
  });

  const sortedData = data.sort((a, b) => a.name - b.name);
  
  sortedData.forEach(state => {
   const option = document.createElement('option')
   option.value = state.iso2
   option.textContent = state.name
   stateSelect.appendChild(option)
  })
  
 })
 .catch(error => console.log('error', error));

}

function getCountryAndStateCodes() {

 const selectedStateCode = stateSelect.value;

 if (stateCodesInSF.includes(selectedStateCode)) {
  if (selectedStateCode != undefined) {
   this.stateCode = selectedStateCode;
  } else {
   this.stateCode = '';
  }
  
 } else {
  this.stateCode = '';
 }

 document.getElementById('state_code').value = this.stateCode; 

}

window.onload = loadCountries
 